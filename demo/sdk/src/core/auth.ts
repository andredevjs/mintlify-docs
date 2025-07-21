import type { OdinSDKConfig } from '../types/config';
import type { AuthManager, PrepareResult, LoginParams, AuthResult } from '../types/auth';
import { OdinAuthError } from '../utils/errors';
import { Actor, HttpAgent } from '@dfinity/agent';
import {
  DelegationIdentity,
  Ed25519KeyIdentity,
} from '@dfinity/identity';
import { idlFactory as SIWBIdlFactory } from '../canister/ic_siwb_provider.idl';
import { SIWB_CANISTER_ID, DEFAULT_IC_HOST } from '../constants/canister';
import type {
  SIWBActor,
  SIWBPrepareLoginResponse,
  SIWBLoginResponse,
  SIWBGetDelegationResponse,
  SIWBSignMessageType,
} from '../types/siwb';
import { createDelegationChain } from '../utils/auth';

/**
 * Authentication service implementation
 */
export class AuthService implements AuthManager {
  private config: Required<OdinSDKConfig>;
  private currentAuth: AuthResult | null = null;
  private currentDelegationIdentity: DelegationIdentity | null = null;

  constructor(config: Required<OdinSDKConfig>) {
    this.config = config;
  }

  /**
   * Phase 1: Prepare authentication and get message to sign
   */
  async prepare(address: string): Promise<PrepareResult> {
    try {
      if (this.config.enableLogging) {
        console.log('Preparing authentication for address:', address);
      }

      // Create anonymous agent for SIWB canister
      const agent = new HttpAgent({ host: DEFAULT_IC_HOST });

      // Create SIWB actor
      const siwbActor = Actor.createActor(SIWBIdlFactory, {
        agent,
        canisterId: SIWB_CANISTER_ID,
      }) as SIWBActor;

      if (this.config.enableLogging) {
        console.log('Calling siwb_prepare_login for address:', address);
      }

      // Call the SIWB canister's prepare login method
      const response: SIWBPrepareLoginResponse = await siwbActor.siwb_prepare_login(address);

      if ('Err' in response) {
        throw new OdinAuthError(`SIWB prepare login failed: ${response.Err}`);
      }

      const message = response.Ok;

      if (this.config.enableLogging) {
        console.log('Successfully prepared authentication, message length:', message.length);
      }

      return {
        address,
        message,
      };
    } catch (error) {
      if (error instanceof OdinAuthError) {
        throw error;
      }

      throw new OdinAuthError(
        `Failed to prepare authentication: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }
  }

  /**
   * Phase 2: Complete authentication with signed message
   */
  async login(params: LoginParams): Promise<AuthResult> {
    try {
      if (this.config.enableLogging) {
        console.log('Completing authentication for address:', params.address);
      }

      // Step 1: Verify signature with bip322-js
      if (this.config.enableLogging) {
        console.log('Verifying BIP322 signature...');
      }

      // Step 2: Create anonymous agent and SIWB actor
      const agent = new HttpAgent({ host: DEFAULT_IC_HOST });
      const siwbActor = Actor.createActor(SIWBIdlFactory, {
        agent,
        canisterId: SIWB_CANISTER_ID,
      }) as SIWBActor;

      // Step 3: Generate session identity
      const sessionIdentity = Ed25519KeyIdentity.generate();
      const sessionPublicKey = sessionIdentity.getPublicKey().toDer();

      if (this.config.enableLogging) {
        console.log('Generated session identity');
      }

      // Step 4: Call siwb_login
      const signMessageType: SIWBSignMessageType = { Bip322Simple: null };

      if (this.config.enableLogging) {
        console.log('Calling siwb_login...');
      }

      const loginResponse: SIWBLoginResponse = await siwbActor.siwb_login(
        params.signature, // Keep as string (base64)
        params.address, // Keep as string
        params.publicKey, // Keep as string (hex)
        new Uint8Array(sessionPublicKey),
        signMessageType
      );

      if ('Err' in loginResponse) {
        throw new OdinAuthError(`SIWB login failed: ${loginResponse.Err}`);
      }

      if (this.config.enableLogging) {
        console.log('✅ SIWB login successful');
      }

      // Step 5: Get delegation
      if (this.config.enableLogging) {
        console.log('Getting delegation...');
      }

      const delegationResponse: SIWBGetDelegationResponse = await siwbActor.siwb_get_delegation(
        params.address,
        new Uint8Array(sessionPublicKey),
        loginResponse.Ok.expiration
      );

      if ('Err' in delegationResponse) {
        throw new OdinAuthError(`SIWB get delegation failed: ${delegationResponse.Err}`);
      }

      if (this.config.enableLogging) {
        console.log('✅ Delegation received');
      }

      // Step 6: Create delegation chain
      const delegationChain = createDelegationChain(
        delegationResponse.Ok,
        loginResponse.Ok.user_canister_pubkey
      );

      // Step 7: Create delegation identity
      const identity = DelegationIdentity.fromDelegation(sessionIdentity, delegationChain);
      const principalId = identity.getPrincipal().toText();

      if (this.config.enableLogging) {
        console.log('✅ Delegation identity created, principal:', principalId);
      }

      // Step 8: Exchange for JWT token via API
      if (this.config.enableLogging) {
        console.log('Exchanging delegation for JWT token...');
      }

      const token = await this.authenticateCallback(identity);
      if (this.config.enableLogging) {
        console.log('✅ JWT token received from API');
      }

      const authResult: AuthResult = {
        token,
        principalId,
        expiresIn: 3600, // 1 hour default
        identity,
      };

      // Store the delegation identity for canister calls
      this.currentDelegationIdentity = identity;

      this.currentAuth = authResult;

      if (this.config.enableLogging) {
        console.log('🎉 Authentication completed successfully!');
      }

      return authResult;
    } catch (error) {
      if (error instanceof OdinAuthError) {
        throw error;
      }

      throw new OdinAuthError(
        `Failed to complete authentication: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error
      );
    }
  }

  /**
   * Check if user is currently authenticated
   */
  isAuthenticated(): boolean {
    return this.currentAuth !== null && !this.isTokenExpired();
  }

  /**
   * Get current user principal
   */
  async getCurrentUser(): Promise<string | null> {
    if (!this.isAuthenticated()) {
      return null;
    }
    return this.currentAuth?.principalId || null;
  }

  /**
   * Get the current delegation identity (for canister calls)
   */
  getDelegationIdentity(): DelegationIdentity | null {
    return this.currentDelegationIdentity;
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    this.currentAuth = null;
    this.currentDelegationIdentity = null;

    if (this.config.enableLogging) {
      console.log('User signed out');
    }
  }

  /**
   * Get current authentication result (internal use)
   */
  getCurrentAuth(): AuthResult | null {
    return this.currentAuth;
  }

  /**
   * Helper function to check if identity is a DelegationIdentity
   */
  private isDelegationIdentity(
    identity: DelegationIdentity | Ed25519KeyIdentity
  ): identity is DelegationIdentity {
    return 'getDelegation' in identity;
  }

  /**
   * Exchange delegation identity for JWT token via API
   * Based on authenticateCallback from siwbapi.ts
   */
  private async authenticateCallback(
    identity: DelegationIdentity | Ed25519KeyIdentity
  ): Promise<string> {
    if (!identity) {
      throw new OdinAuthError('No Identity provided for authentication');
    }

    // Step 1: Sign timestamp with identity
    const timestamp = Date.now().toString();
    const signatureBuffer = await identity.sign(
      new TextEncoder().encode(timestamp) as unknown as ArrayBuffer
    );
    const publicKey = Buffer.from(identity.getPublicKey().toDer()).toString('base64');

    // Step 2: Create payload - match siwbapi.ts structure exactly
    const payload: any = {
      timestamp,
      signature: Buffer.from(signatureBuffer).toString('base64'),
    };

    // Add delegation for DelegationIdentity, publickey for Ed25519KeyIdentity
    if (this.isDelegationIdentity(identity)) {
      payload.delegation = JSON.stringify(identity.getDelegation().toJSON());
    } else {
      payload.publickey = publicKey;
    }

    // Step 3:  API endpoint
    const endpoint = `${this.config.baseUrl}/auth`;

    if (this.config.enableLogging) {
      console.log(`Attempting auth endpoint: ${endpoint}`);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(this.config.timeout),
    });

    if (this.config.enableLogging) {
      console.log(`Response: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error response');
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new Error(`Expected JSON response, got: ${contentType}`);
    }

    const authResponse = await response.json();

    if (this.config.enableLogging) {
      console.log('Auth response keys:', Object.keys(authResponse));
    }

    // Handle different possible response structures
    const token =
      authResponse.token ||
      authResponse.accessToken ||
      authResponse.jwt ||
      authResponse.access_token;

    if (!token) {
      throw new Error(
        `No token found in response. Available keys: ${Object.keys(authResponse).join(', ')}`
      );
    }

    if (this.config.enableLogging) {
      console.log('✅ Successfully received JWT token from API');
    }

    return token;
  }

  /**
   * Check if the current token is expired
   */
  private isTokenExpired(): boolean {
    if (!this.currentAuth) {
      return true;
    }

    // This is a placeholder - real implementation would check actual expiry
    return false;
  }
}

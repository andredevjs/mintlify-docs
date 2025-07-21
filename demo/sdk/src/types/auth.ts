import type { DelegationIdentity } from '@dfinity/identity';

/**
 * Signature types supported by the SDK
 */
export type SignatureType = 'Bip322Simple'; // ECDSA is also supported by SIWB

/**
 * Result from the prepare authentication phase
 */
export interface PrepareResult {
  /** Bitcoin address used for authentication */
  address: string;

  /** Message to be signed by the wallet */
  message: string;
}

/**
 * Parameters for completing the login process
 */
export interface LoginParams {
  /** Bitcoin address */
  address: string;

  /** Original message that was signed */
  message: string;

  /** Signed message from wallet */
  signature: string;

  /** Bitcoin public key */
  publicKey: string;

  /** Type of signature used */
  signatureType: SignatureType;

  /** Optional referrer code */
  referrer?: string;
}

/**
 * Result from successful authentication
 */
export interface AuthResult {
  /** JWT token for API authentication */
  token: string;

  /** Principal ID of the authenticated user */
  principalId: string;

  /** Token expiration time in seconds */
  expiresIn: number;

  /** DelegationIdentity for canister authentication */
  identity: DelegationIdentity;
}

/**
 * Authentication manager interface
 */
export interface AuthManager {
  /** Phase 1: Prepare and get message to sign */
  prepare(address: string): Promise<PrepareResult>;

  /** Phase 2: Login with signed message */
  login(params: LoginParams): Promise<AuthResult>;

  /** Check if user is authenticated */
  isAuthenticated(): boolean;

  /** Get current user principal */
  getCurrentUser(): Promise<string | null>;

  /** Get the current delegation identity (for canister calls) */
  getDelegationIdentity(): DelegationIdentity | null;

  /** Sign out */
  signOut(): Promise<void>;
}

import type { OdinSDKConfig } from '../types/config';
import type { AuthManager } from '../types/auth';
import type { CanisterService } from '../types/canister';
import { AuthService } from '../core/auth';
import { CanisterServiceImpl } from '../services/canister';
import { TokenService } from '../services/token';
import { UserService } from '../services/user';

/**
 * Main Odin SDK client class
 */
export class OdinSDK {
  private config: Required<OdinSDKConfig>;

  // Core services
  public readonly auth: AuthManager;
  public readonly canister: CanisterService;
  public readonly tokens: TokenService;
  public readonly users: UserService;

  // TODO: Add other services
  // public readonly trades: TradeService;

  constructor(config: OdinSDKConfig) {
    // Apply default configuration
    this.config = {
      timeout: 30000,
      enableLogging: false,
      ...config,
    };

    // Initialize core services
    this.auth = new AuthService(this.config);
    this.canister = new CanisterServiceImpl(this.auth);
    this.tokens = new TokenService(this.config);
    this.users = new UserService(this.config);

    // Log initialization if enabled
    if (this.config.enableLogging) {
      console.log('Odin SDK initialized with config:', {
        baseUrl: this.config.baseUrl,
        timeout: this.config.timeout,
      });
    }
  }

  /**
   * Get the current configuration
   */
  public getConfig(): Required<OdinSDKConfig> {
    return { ...this.config };
  }

  /**
   * Check if the SDK is properly configured
   */
  public isConfigured(): boolean {
    return Boolean(this.config.baseUrl);
  }
}

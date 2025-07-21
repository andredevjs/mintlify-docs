/**
 * Configuration options for the Odin SDK
 */
export interface OdinSDKConfig {
  /** API base URL */
  baseUrl: string;

  /** Request timeout in milliseconds (default: 30000ms) */
  timeout?: number;

  /** Enable debug logging */
  enableLogging?: boolean;
}

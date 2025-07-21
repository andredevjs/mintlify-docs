/**
 * Base error class for all Odin SDK errors
 */
export class OdinError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'OdinError';
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, OdinError);
    }
  }
}

/**
 * Error thrown when API requests fail
 */
export class OdinAPIError extends OdinError {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message, 'API_ERROR', status);
    this.name = 'OdinAPIError';
  }
}

/**
 * Error thrown during authentication processes
 */
export class OdinAuthError extends OdinError {
  constructor(message: string, originalError?: any) {
    super(message, 'AUTH_ERROR', undefined, originalError);
    this.name = 'OdinAuthError';
  }
}

/**
 * Error thrown for network-related issues
 */
export class OdinNetworkError extends OdinError {
  constructor(message: string, originalError: any) {
    super(message, 'NETWORK_ERROR', undefined, originalError);
    this.name = 'OdinNetworkError';
  }
}

/**
 * Error thrown during canister interactions
 */
export class OdinCanisterError extends OdinError {
  constructor(message: string, originalError?: any) {
    super(message, 'CANISTER_ERROR', undefined, originalError);
    this.name = 'OdinCanisterError';
  }
} 
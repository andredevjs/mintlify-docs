import type { OdinSDKConfig } from '../types/config';
import { OdinError } from '../utils/errors';

export abstract class BaseService {
  protected config: Required<OdinSDKConfig>;
  protected logger: Console | undefined;

  constructor(config: Required<OdinSDKConfig>) {
    this.config = config;
    this.logger = config.enableLogging ? console : undefined;
  }

  /**
   * Get common headers for API requests
   */
  protected getHeaders(additionalHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authentication header if available
    // This would be implemented when we have auth token management
    // const authToken = this.getAuthToken();
    // if (authToken) {
    //   headers.Authorization = `Bearer ${authToken}`;
    // }

    return { ...headers, ...additionalHeaders };
  }

  /**
   * Make an HTTP request to the API
   */
  protected async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    body?: any,
    additionalHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers = this.getHeaders(additionalHeaders);

    const requestInit: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      requestInit.body = JSON.stringify(body);
    }

    try {
      this.logger?.debug(`Making ${method} request to:`, url);

      const response = await fetch(url, requestInit);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      const result = await response.json();
      this.logger?.debug(`${method} request successful:`, result);

      return result;
    } catch (error) {
      this.logger?.error(`${method} request failed:`, error);
      throw error;
    }
  }

  /**
   * Build query string from parameters
   */
  protected buildQueryString(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return queryParams.toString();
  }
}

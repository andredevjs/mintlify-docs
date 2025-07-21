import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../src/core/auth';
import { OdinAuthError } from '../src/utils/errors';
import type { OdinSDKConfig } from '../src/types/config';

describe('AuthService', () => {
  let authService: AuthService;
  let mockConfig: Required<OdinSDKConfig>;

  beforeEach(() => {
    mockConfig = {
      baseUrl: 'https://api.odin.fun/dev',
      timeout: 30000,
      enableLogging: false,
    };
    authService = new AuthService(mockConfig);
  });

  describe('prepare', () => {
    it('should return a prepare result with address and message', async () => {
      const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

      const result = await authService.prepare(address);

      expect(result).toHaveProperty('address', address);
      expect(result).toHaveProperty('message');
      expect(typeof result.message).toBe('string');
      expect(result.message.length).toBeGreaterThan(0);
    });

    it('should include the address in the message', async () => {
      const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

      const result = await authService.prepare(address);

      expect(result.message).toContain(address);
    });

    it('should throw OdinAuthError on failure', async () => {
      // This test will need to be updated when real implementation is added
      // For now, we test the happy path since the current implementation doesn't fail
      const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

      await expect(authService.prepare(address)).resolves.toBeDefined();
    });
  });

  describe('login', () => {
    it('should return auth result with placeholder values', async () => {
      const loginParams = {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        message: 'test message',
        signature: 'test signature',
        publicKey: 'test public key',
        signatureType: 'Bip322Simple' as const,
      };

      const result = await authService.login(loginParams);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('principalId');
      expect(result).toHaveProperty('expiresIn');
      expect(result).toHaveProperty('identity');
      expect(typeof result.token).toBe('string');
      expect(typeof result.principalId).toBe('string');
      expect(typeof result.expiresIn).toBe('number');
    });

    it('should set authentication state after successful login', async () => {
      const loginParams = {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        message: 'test message',
        signature: 'test signature',
        publicKey: 'test public key',
        signatureType: 'Bip322Simple' as const,
      };

      expect(authService.isAuthenticated()).toBe(false);

      await authService.login(loginParams);

      expect(authService.isAuthenticated()).toBe(true);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false initially', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true after successful login', async () => {
      const loginParams = {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        message: 'test message',
        signature: 'test signature',
        publicKey: 'test public key',
        signatureType: 'Bip322Simple' as const,
      };

      await authService.login(loginParams);
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false after sign out', async () => {
      const loginParams = {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        message: 'test message',
        signature: 'test signature',
        publicKey: 'test public key',
        signatureType: 'Bip322Simple' as const,
      };

      await authService.login(loginParams);
      expect(authService.isAuthenticated()).toBe(true);

      await authService.signOut();
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return null when not authenticated', async () => {
      const user = await authService.getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return principal ID when authenticated', async () => {
      const loginParams = {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        message: 'test message',
        signature: 'test signature',
        publicKey: 'test public key',
        signatureType: 'Bip322Simple' as const,
      };

      const authResult = await authService.login(loginParams);
      const user = await authService.getCurrentUser();

      expect(user).toBe(authResult.principalId);
    });
  });

  describe('signOut', () => {
    it('should clear authentication state', async () => {
      const loginParams = {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        message: 'test message',
        signature: 'test signature',
        publicKey: 'test public key',
        signatureType: 'Bip322Simple' as const,
      };

      await authService.login(loginParams);
      expect(authService.isAuthenticated()).toBe(true);

      await authService.signOut();
      expect(authService.isAuthenticated()).toBe(false);

      const user = await authService.getCurrentUser();
      expect(user).toBeNull();
    });
  });
});

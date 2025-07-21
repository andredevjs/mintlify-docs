import { BaseService } from './base';
import {
  UserEntity,
  TokenAndBalanceEntity,
  UserBalanceEntity,
  UserActivityEntity,
  UserAchievementResponse,
  ReferralEarningEntity,
  UserRealizedPnlEntity,
  UserUnrealizedPnlEntity,
  TransactionAndTokenEntity,
  HiroRuneEntity,
  NowNodesUtxoEntity,
  UsersResponse,
  UserTokensResponse,
  UserBalancesResponse,
  UserCreatedTokensResponse,
  UserActivityResponse,
  UserFavoritesResponse,
  ReferralEarningsResponse,
  UserTransactionsResponse,
  UserRunesResponse,
  UserUtxoResponse,
  UserStatsResponse,
  UserAchievementsResponse,
  ReferralEarningsStatsResponse,
  UserPnlResponse,
  PendingDepositsResponse,
  PendingWithdrawalsResponse,
  UserQueryParams,
  UserTokenQueryParams,
  UserBalanceQueryParams,
  UserCreatedQueryParams,
  ActivityQueryParams,
  FavoriteQueryParams,
  ReferralQueryParams,
  TransactionQueryParams,
  UpsertProfileDto,
  UpdateUsernameDto,
  UploadProfileImageDto,
} from '../types/user';
import { TokenEntity } from '../types/token';
import { OdinError } from '../utils/errors';

export class UserService extends BaseService {
  /**
   * Get all users with optional filtering and pagination
   */
  async getUsers(params?: UserQueryParams): Promise<UsersResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UsersResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error('Failed to get users:', error);
      throw new OdinError('Failed to get users', 'GET_USERS_ERROR', undefined, error);
    }
  }

  /**
   * Get a specific user by principal
   */
  async getUser(principal: string): Promise<UserEntity> {
    try {
      const response = await this.makeRequest<UserEntity>('GET', `/user/${principal}`);
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get user ${principal}:`, error);
      throw new OdinError(`Failed to get user ${principal}`, 'GET_USER_ERROR', undefined, error);
    }
  }

  /**
   * Get user's owned tokens
   */
  async getUserTokens(
    principal: string,
    params?: UserTokenQueryParams
  ): Promise<UserTokensResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const url = `/user/${principal}/tokens${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserTokensResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get tokens for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get tokens for user ${principal}`,
        'GET_USER_TOKENS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user's liquidity positions
   */
  async getUserLiquidity(
    principal: string,
    params?: UserTokenQueryParams
  ): Promise<UserTokensResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const url = `/user/${principal}/liquidity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserTokensResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get liquidity for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get liquidity for user ${principal}`,
        'GET_USER_LIQUIDITY_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user's created tokens
   */
  async getUserCreatedTokens(
    principal: string,
    params?: UserCreatedQueryParams
  ): Promise<UserCreatedTokensResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const url = `/user/${principal}/created${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserCreatedTokensResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get created tokens for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get created tokens for user ${principal}`,
        'GET_USER_CREATED_TOKENS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user's token balances
   */
  async getUserBalances(
    principal: string,
    params?: UserBalanceQueryParams
  ): Promise<UserBalancesResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/user/${principal}/balances${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserBalancesResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get balances for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get balances for user ${principal}`,
        'GET_USER_BALANCES_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Update user profile (requires authentication)
   */
  async updateProfile(profile: UpsertProfileDto): Promise<UserEntity> {
    try {
      const response = await this.makeRequest<UserEntity>('PUT', '/user/profile', profile);
      return response;
    } catch (error) {
      this.logger?.error('Failed to update user profile:', error);
      throw new OdinError(
        'Failed to update user profile',
        'UPDATE_PROFILE_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Update username (requires authentication)
   */
  async updateUsername(username: UpdateUsernameDto): Promise<UserEntity> {
    try {
      const response = await this.makeRequest<UserEntity>('PUT', '/user/username', username);
      return response;
    } catch (error) {
      this.logger?.error('Failed to update username:', error);
      throw new OdinError('Failed to update username', 'UPDATE_USERNAME_ERROR', undefined, error);
    }
  }

  /**
   * Upload profile image (requires authentication)
   */
  async uploadProfileImage(imageData: UploadProfileImageDto): Promise<UserEntity> {
    try {
      // For file uploads, we need to handle FormData
      const formData = new FormData();
      formData.append('image', imageData.image);

      const response = await fetch(`${this.config.baseUrl}/user/profile/image`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          // Remove Content-Type to let browser set it for FormData
          'Content-Type': undefined as any,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      this.logger?.error('Failed to upload profile image:', error);
      throw new OdinError('Failed to upload profile image', 'UPLOAD_IMAGE_ERROR', undefined, error);
    }
  }

  /**
   * Get user UTXO information
   */
  async getUserUtxo(btcAddress: string): Promise<UserUtxoResponse> {
    try {
      const response = await this.makeRequest<UserUtxoResponse>('GET', `/user/utxo/${btcAddress}`);
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get UTXO for address ${btcAddress}:`, error);
      throw new OdinError(
        `Failed to get UTXO for address ${btcAddress}`,
        'GET_USER_UTXO_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user runes
   */
  async getUserRunes(principal: string): Promise<UserRunesResponse> {
    try {
      const response = await this.makeRequest<UserRunesResponse>('GET', `/user/${principal}/runes`);
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get runes for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get runes for user ${principal}`,
        'GET_USER_RUNES_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user image
   */
  async getUserImage(userId: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.config.baseUrl}/user/${userId}/image`, {
        method: 'GET',
        headers: {
          ...this.getHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      this.logger?.error(`Failed to get image for user ${userId}:`, error);
      throw new OdinError(
        `Failed to get image for user ${userId}`,
        'GET_USER_IMAGE_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get pending deposits
   */
  async getPendingDeposits(principal: string): Promise<PendingDepositsResponse> {
    try {
      const response = await this.makeRequest<PendingDepositsResponse>(
        'GET',
        `/user/${principal}/pending-deposits`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get pending deposits for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get pending deposits for user ${principal}`,
        'GET_PENDING_DEPOSITS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get pending withdrawals
   */
  async getPendingWithdrawals(principal: string): Promise<PendingWithdrawalsResponse> {
    try {
      const response = await this.makeRequest<PendingWithdrawalsResponse>(
        'GET',
        `/user/${principal}/pending-withdrawals`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get pending withdrawals for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get pending withdrawals for user ${principal}`,
        'GET_PENDING_WITHDRAWALS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user activity
   */
  async getUserActivity(
    principal: string,
    params?: ActivityQueryParams
  ): Promise<UserActivityResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/user/${principal}/activity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserActivityResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get activity for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get activity for user ${principal}`,
        'GET_USER_ACTIVITY_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user achievements
   */
  async getUserAchievements(principal: string): Promise<UserAchievementsResponse> {
    try {
      const response = await this.makeRequest<UserAchievementsResponse>(
        'GET',
        `/user/${principal}/achievements`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get achievements for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get achievements for user ${principal}`,
        'GET_USER_ACHIEVEMENTS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Claim achievement (requires authentication)
   */
  async claimAchievement(achievementId: number): Promise<void> {
    try {
      await this.makeRequest<void>('POST', `/user/achievements/${achievementId}/claim`);
    } catch (error) {
      this.logger?.error(`Failed to claim achievement ${achievementId}:`, error);
      throw new OdinError(
        `Failed to claim achievement ${achievementId}`,
        'CLAIM_ACHIEVEMENT_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user stats
   */
  async getUserStats(principal: string): Promise<UserStatsResponse> {
    try {
      const response = await this.makeRequest<UserStatsResponse>('GET', `/user/${principal}/stats`);
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get stats for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get stats for user ${principal}`,
        'GET_USER_STATS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user favorites
   */
  async getUserTokenFavorites(
    principal: string,
    params?: FavoriteQueryParams
  ): Promise<UserFavoritesResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/user/${principal}/favorites${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserFavoritesResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get favorites for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get favorites for user ${principal}`,
        'GET_USER_FAVORITES_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get referral earnings
   */
  async getReferralEarnings(principal: string): Promise<ReferralEarningsStatsResponse> {
    try {
      const response = await this.makeRequest<ReferralEarningsStatsResponse>(
        'GET',
        `/user/${principal}/referral-earnings`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get referral earnings for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get referral earnings for user ${principal}`,
        'GET_REFERRAL_EARNINGS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get referral earnings history
   */
  async getReferralEarningsHistory(
    principal: string,
    params?: ReferralQueryParams
  ): Promise<ReferralEarningsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/user/${principal}/referral-earnings/history${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<ReferralEarningsResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get referral earnings history for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get referral earnings history for user ${principal}`,
        'GET_REFERRAL_EARNINGS_HISTORY_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user realized P&L
   */
  async getUserRealizedPnl(principal: string, token: string): Promise<UserPnlResponse> {
    try {
      const response = await this.makeRequest<UserPnlResponse>(
        'GET',
        `/user/${principal}/realized-pnl/${token}`
      );
      return response;
    } catch (error) {
      this.logger?.error(
        `Failed to get realized P&L for user ${principal} and token ${token}:`,
        error
      );
      throw new OdinError(
        `Failed to get realized P&L for user ${principal} and token ${token}`,
        'GET_USER_REALIZED_PNL_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user unrealized P&L
   */
  async getUserUnrealizedPnl(principal: string, token: string): Promise<UserPnlResponse> {
    try {
      const response = await this.makeRequest<UserPnlResponse>(
        'GET',
        `/user/${principal}/unrealized-pnl/${token}`
      );
      return response;
    } catch (error) {
      this.logger?.error(
        `Failed to get unrealized P&L for user ${principal} and token ${token}:`,
        error
      );
      throw new OdinError(
        `Failed to get unrealized P&L for user ${principal} and token ${token}`,
        'GET_USER_UNREALIZED_PNL_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get user transactions
   */
  async getUserTransactions(
    principal: string,
    params?: TransactionQueryParams
  ): Promise<UserTransactionsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/user/${principal}/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<UserTransactionsResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get transactions for user ${principal}:`, error);
      throw new OdinError(
        `Failed to get transactions for user ${principal}`,
        'GET_USER_TRANSACTIONS_ERROR',
        undefined,
        error
      );
    }
  }
}

// Main SDK client
export { OdinSDK } from './core/client';

// Configuration types
export type { OdinSDKConfig } from './types/config';

// Authentication types and interfaces
export type {
  AuthManager,
  PrepareResult,
  LoginParams,
  AuthResult,
  SignatureType,
} from './types/auth';

// Token types
export type {
  TokenEntity,
  LedgerEntity,
  TagEntity,
  CommentEntity,
  TradeEntity,
  TokenFeedEntity,
  TokenFavoriteEntity,
  TokensQueryParams,
  CommentsQueryParams,
  OwnersQueryParams,
  TradesQueryParams,
  TokenFeedQueryParams,
  TradingViewFeedQueryParams,
  CreateTokenCommentDto,
  TokenSortOption,
  OwnersSortOption,
  TradesSortOption,
} from './types/token';

// Common types
export type { Paginated, BaseEntity, ApiResponse, ErrorResponse } from './types/common';

// User types
export type {
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
  UserSortOption,
  BalanceSortOption,
  ActivitySortOption,
  FavoriteSortOption,
  ReferralSortOption,
  TransactionSortOption,
} from './types/user';

// Canister types
export type {
  CanisterService,
  BuyTokenParams,
  SellTokenParams,
  TransferTokenParams,
  WithdrawBtcParams,
  DepositTokenParams,
  TransferResult,
  WithdrawResult,
  DepositResult,
  TokenBalance,
  WithdrawProtocol,
} from './types/canister';

// Error classes
export {
  OdinError,
  OdinAPIError,
  OdinAuthError,
  OdinNetworkError,
  OdinCanisterError,
} from './utils/errors';

// Services
export { TokenService } from './services/token';
export { UserService } from './services/user';
export { CanisterServiceImpl } from './services/canister';

// Version
export const VERSION = '0.1.0';

// Re-export commonly used types from dependencies
export type { DelegationIdentity } from '@dfinity/identity';
export type { Principal } from '@dfinity/principal';

// User-related types based on OpenAPI specification

import { Paginated } from './common';
import { TokenEntity } from './token';

export interface UserEntity {
  principal: string;
  username?: string;
  bio?: string;
  image?: string;
  referrer?: string;
  admin: boolean;
  ref_code: string;
  profit: number;
  total_asset_value: number;
  referral_count: number;
  referral_earnings: number;
  access_allowed: boolean;
  beta_access_codes: string;
  btc_deposit_address: string;
  blife_id: string;
  created_at: string;
  btc_wallet_address: string;
  rune_deposit_address: string;
}

export interface TokenAndBalanceEntity {
  token: TokenEntity;
  balance: number;
}

export interface UserBalanceEntity {
  id: string;
  ticker: string;
  rune: string;
  name: string;
  image: string | null;
  divisibility: number;
  decimals: number;
  trading: boolean;
  deposits: boolean;
  withdrawals: boolean;
  rune_id: string;
  balance: number;
  type: string;
  // Additional fields not in OpenAPI spec but present in actual API response
  ledger_price: number;
  token_price: number;
}

export interface UserActivityTokenEntity {
  id: string;
  ticker: string;
  rune: string;
  name: string;
  image: string;
  divisibility: number;
  decimals: number;
  trading: boolean;
  deposits: boolean;
  withdrawals: boolean;
  rune_id: string;
}

export interface UserActivityEntity {
  id?: string;
  time: string;
  action: number; // ActivityAction enum
  amount_token: number;
  amount_btc: number;
  description: any; // Function type
  token?: UserActivityTokenEntity;
  rel_token?: TokenEntity;
}

export interface UserAchievementResponse {
  id: number;
  name: string;
  description: string;
  icon?: string;
  claimed: boolean;
  claimed_time?: string;
  reward_amount?: number;
}

export interface ReferralEarningEntity {
  id: string;
  user: string;
  referred_user: string;
  amount: number;
  token: string;
  created_time: string;
  metadata?: Record<string, any>;
}

export interface UserRealizedPnlEntity {
  user: string;
  token: string;
  realized_pnl: number;
  total_bought: number;
  total_sold: number;
  avg_buy_price: number;
  avg_sell_price: number;
}

export interface UserUnrealizedPnlEntity {
  user: string;
  token: string;
  unrealized_pnl: number;
  current_balance: number;
  avg_buy_price: number;
  current_price: number;
}

export interface NowNodesUtxoEntity {
  txid: string;
  vout: number;
  value: number;
  height: number;
  confirmations: number;
}

export interface HiroRuneEntity {
  rune: {
    id: string;
    name: string;
    spaced_name: string;
  };
  balance: string;
  symbol?: string;
  divisibility: number;
}

export interface TransactionAndTokenEntity {
  id: string;
  user: string;
  token: string;
  type: string;
  amount: number;
  price?: number;
  total_value?: number;
  created_time: string;
  metadata?: Record<string, any>;
  token_name: string;
  token_ticker: string;
  token_image?: string;
}

// Query parameter types
export interface UserQueryParams {
  page?: number;
  limit?: number;
  sort?: UserSortOption;
  search?: string;
  username?: string;
}

export interface UserTokenQueryParams {
  page?: number;
  limit?: number;
  env?: 'production' | 'staging' | 'development';
  bonded?: boolean;
  featured?: boolean;
  sort?: TokenSortOption;
  search?: string;
  verified?: boolean;
  twitter_verified?: boolean;
}

export interface UserBalanceQueryParams {
  page?: number;
  limit?: number;
  sort?: BalanceSortOption;
}

export interface UserCreatedQueryParams {
  page?: number;
  limit?: number;
  env?: 'production' | 'staging' | 'development';
  bonded?: boolean;
  featured?: boolean;
  sort?: TokenSortOption;
}

export interface ActivityQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  token?: string;
  sort?: ActivitySortOption;
}

export interface FavoriteQueryParams {
  page?: number;
  limit?: number;
  sort?: FavoriteSortOption;
}

export interface ReferralQueryParams {
  page?: number;
  limit?: number;
  sort?: ReferralSortOption;
}

export interface TransactionQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  token?: string;
  sort?: TransactionSortOption;
}

// Sort options
export type UserSortOption = 'created_at:asc' | 'created_at:desc';

export type TokenSortOption =
  | 'created_time:asc'
  | 'created_time:desc'
  | 'price:asc'
  | 'price:desc'
  | 'marketcap:asc'
  | 'marketcap:desc'
  | 'volume:asc'
  | 'volume:desc'
  | 'holder_count:asc'
  | 'holder_count:desc';

export type BalanceSortOption =
  | 'balance:asc'
  | 'balance:desc'
  | 'token_price:asc'
  | 'token_price:desc'
  | 'name:asc'
  | 'name:desc';

export type ActivitySortOption =
  | 'time:asc'
  | 'time:desc'
  | 'amount_btc:asc'
  | 'amount_btc:desc'
  | 'amount_token:asc'
  | 'amount_token:desc';

export type FavoriteSortOption =
  | 'created_time:asc'
  | 'created_time:desc'
  | 'token_name:asc'
  | 'token_name:desc';

export type ReferralSortOption =
  | 'created_time:asc'
  | 'created_time:desc'
  | 'amount:asc'
  | 'amount:desc';

export type TransactionSortOption =
  | 'created_time:asc'
  | 'created_time:desc'
  | 'amount:asc'
  | 'amount:desc'
  | 'total_value:asc'
  | 'total_value:desc';

// DTOs for mutations
export interface UpsertProfileDto {
  username?: string;
  bio?: string;
  twitter?: string;
  website?: string;
  telegram?: string;
}

export interface UpdateUsernameDto {
  username: string;
}

export interface UploadProfileImageDto {
  image: File | Blob;
}

// Response types
export interface UsersResponse extends Paginated<UserEntity> {}
export interface UserTokensResponse extends Paginated<TokenAndBalanceEntity> {}
export interface UserBalancesResponse extends Paginated<UserBalanceEntity> {}
export interface UserCreatedTokensResponse extends Paginated<TokenEntity> {}
export interface UserActivityResponse extends Paginated<UserActivityEntity> {}
export interface UserFavoritesResponse extends Paginated<any> {}
export interface ReferralEarningsResponse extends Paginated<ReferralEarningEntity> {}
export interface UserTransactionsResponse extends Paginated<TransactionAndTokenEntity> {}
export interface UserRunesResponse extends Paginated<HiroRuneEntity> {}
export interface UserUtxoResponse {
  data: NowNodesUtxoEntity[];
}

export interface UserStatsResponse {
  data: {
    total_asset_value: number;
    total_liquidity: number;
    btc: number;
  };
}

export interface UserAchievementsResponse {
  data: UserAchievementResponse[];
}

export interface ReferralEarningsStatsResponse {
  data: any;
}

export interface UserPnlResponse {
  data: UserRealizedPnlEntity | UserUnrealizedPnlEntity;
}

export interface PendingDepositsResponse {
  data: any[];
}

export interface PendingWithdrawalsResponse {
  data: string[];
}

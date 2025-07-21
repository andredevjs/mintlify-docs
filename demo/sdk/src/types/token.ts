// Token-related types based on OpenAPI specification

import { Paginated } from './common';

export interface TokenEntity {
  id: string;
  name: string;
  description?: string;
  image?: string;
  creator: string;
  created_time: string;
  volume: number;
  bonded: boolean;
  icrc_ledger?: string;
  price: number;
  marketcap: number;
  rune?: string;
  featured: boolean;
  holder_count: number;
  comment_count: number;
  sold: number;
  twitter?: string;
  website?: string;
  telegram?: string;
  last_comment_time?: string;
  rel_ledgers: LedgerEntity[];
  buy_count: number;
  sell_count: number;
  ticker: string;
  btc_liquidity: number;
  user_btc_liquidity: number;
  user_token_liquidity: number;
  user_lp_tokens: number;
  token_liquidity: number;
  total_supply: number;
  swap_fees: number;
  swap_volume: number;
  swap_fees_24: number;
  threshold: number;
  swap_volume_24: number;
  holder_dev: number;
  holder_top: number;
  txn_count: number;
  decimals: number;
  deposits: boolean;
  divisibility: number;
  external: boolean;
  trading: boolean;
  withdrawals: boolean;
  last_action_time: string;
  price_5m: number;
  price_1h: number;
  price_6h: number;
  price_1d: number;
  rune_id: string;
  twitter_verified: boolean;
  rel_tags: TagEntity[];
  verified: boolean;
  liquidity_threshold: number;
  progress: number;
}

export interface LedgerEntity {
  user: string;
  token: string;
  balance: number;
  user_username: string;
  user_image: string;
  tokenid: string;
}

export interface TagEntity {
  id: number;
  name: string;
  description?: string;
  created_time: string;
}

export interface CommentEntity {
  id: number;
  user: string;
  token: string;
  time: string;
  message: string;
  reported: boolean;
  blocked: boolean;
  image?: string;
  pinned: boolean;
  pinned_time?: string;
  community: number;
  user_username: string;
  user_image: string;
  vote: CommentVoteEntity;
  user_upvote: boolean;
}

export interface CommentVoteEntity {
  upvotes: number;
  downvotes: number;
  total: number;
}

export interface TradeEntity {
  id: string;
  user: string;
  token: string;
  time: string;
  buy: boolean;
  amount_btc: number;
  amount_token: number;
  price: number;
  bonded: boolean;
  user_username: string;
  user_image: string;
}

export interface TokenFeedEntity {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TokenFavoriteEntity {
  user: string;
  token: string;
  date_created: string;
}

// Query parameter types
export interface TokensQueryParams {
  page?: number;
  limit?: number;
  env?: 'production' | 'staging' | 'development';
  sort?: TokenSortOption;
  bonded?: boolean;
  featured?: boolean;
  etched?: boolean;
  price_max?: number;
  price_min?: number;
  volume_max?: number;
  volume_min?: number;
  holders_max?: number;
  holders_min?: number;
  comment_count_max?: number;
  comment_count_min?: number;
  sold_max?: number;
  sold_min?: number;
  marketcap_max?: number;
  marketcap_min?: number;
  buy_count_max?: number;
  buy_count_min?: number;
  sell_count_max?: number;
  sell_count_min?: number;
  tx_count_min?: number;
  tx_count_max?: number;
  has_twitter?: boolean;
  has_telegram?: boolean;
  has_website?: boolean;
  search?: string;
  id_in?: string[];
  id_not_in?: string[];
  creator?: string;
  favorite?: string;
  twitter_verified?: boolean;
  verified?: boolean;
  include_tags?: string;
  exclude_tags?: string;
  type_in?: 'internal' | 'token' | 'currency';
  ascended?: boolean;
}

export type TokenSortOption =
  | 'marketcap:asc'
  | 'marketcap:desc'
  | 'price:asc'
  | 'price:desc'
  | 'holder_count:asc'
  | 'holder_count:desc'
  | 'created_time:asc'
  | 'created_time:desc'
  | 'name:asc'
  | 'name:desc'
  | 'last_comment_time:asc'
  | 'last_comment_time:desc'
  | 'comment_count:asc'
  | 'comment_count:desc'
  | 'volume:asc'
  | 'volume:desc'
  | 'sold:asc'
  | 'sold:desc'
  | 'txn_count:asc'
  | 'txn_count:desc'
  | 'btc_liquidity:asc'
  | 'btc_liquidity:desc'
  | 'swap_fees:asc'
  | 'swap_fees:desc'
  | 'swap_fees_24:asc'
  | 'swap_fees_24:desc'
  | 'swap_volume:asc'
  | 'swap_volume:desc'
  | 'swap_volume_24:asc'
  | 'swap_volume_24:desc'
  | 'last_action_time:asc'
  | 'last_action_time:desc'
  | 'price_delta_5m:asc'
  | 'price_delta_5m:desc'
  | 'price_delta_1h:asc'
  | 'price_delta_1h:desc'
  | 'price_delta_6h:asc'
  | 'price_delta_6h:desc'
  | 'price_delta_1d:asc'
  | 'price_delta_1d:desc'
  | 'ascension:asc'
  | 'ascension:desc';

export interface CommentsQueryParams {
  page?: number;
  limit?: number;
  user?: string;
  sort?: string[];
  pinned?: boolean;
  community?: number;
}

export interface OwnersQueryParams {
  page?: number;
  limit?: number;
  sort?: OwnersSortOption;
}

export type OwnersSortOption =
  | 'balance:asc'
  | 'balance:desc'
  | 'holding_value:asc'
  | 'holding_value:desc'
  | 'btc_first:asc'
  | 'btc_first:desc';

export interface TradesQueryParams {
  page?: number;
  limit?: number;
  token?: string;
  time_min?: string;
  time_max?: string;
  user?: string;
  amount_btc_min?: number;
  amount_btc_max?: number;
  amount_token_min?: number;
  amount_token_max?: number;
  price_max?: number;
  price_min?: number;
  bonded?: boolean;
  sort?: TradesSortOption;
  search?: string;
}

export type TradesSortOption =
  | 'id:asc'
  | 'id:desc'
  | 'amount_token:asc'
  | 'amount_token:desc'
  | 'amount_btc:asc'
  | 'amount_btc:desc'
  | 'time:asc'
  | 'time:desc'
  | 'price:asc'
  | 'price:desc';

export interface TokenFeedQueryParams {
  resolution?: number;
  from?: number;
  to?: number;
}

export interface TradingViewFeedQueryParams {
  resolution?: number;
  from?: string;
  to?: string;
  order?: string;
  last?: number;
}

export interface CreateTokenCommentDto {
  message: string;
  community?: number;
}

// Response types
export interface TokenResponse {
  data: TokenEntity;
}

export interface TokensResponse extends Paginated<TokenEntity> {}

export interface CommentsResponse extends Paginated<CommentEntity> {}

export interface OwnersResponse extends Paginated<LedgerEntity> {}

export interface TradesResponse extends Paginated<TradeEntity> {}

export interface TokenFeedResponse {
  data: TokenFeedEntity[];
}

export interface CommentResponse {
  data: CommentEntity;
}

export interface FavoriteResponse {
  data: TokenFavoriteEntity;
}

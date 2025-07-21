import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';

export interface BondingCurveSettings {
  a: number;
  b: number;
  c: number;
  name: string;
}
export interface ListRequest {
  rune_id: string;
}
export type ListResponse = { ok: TokenAmount } | { err: string };
export interface LiquidityPool {
  locked: LiquiditySwap;
  current: LiquiditySwap;
}
export interface LiquidityRequest {
  tokenid: TokenID;
  typeof: LiquidityType;
  amount: TokenAmount;
}
export type LiquidityResponse = { ok: null } | { err: string };
export interface LiquiditySwap {
  btc: TokenAmount;
  token: TokenAmount;
}
export type LiquidityType = { add: null } | { remove: null };
export type Metadata = Array<MetadataRecord>;
export type MetadataRecord = [
  string,
  (
    | { hex: string }
    | { int: bigint }
    | { nat: bigint }
    | { principal: Principal }
    | { blob: Uint8Array | number[] }
    | { bool: boolean }
    | { nat8: number }
    | { text: string }
  ),
];
export interface MintRequest {
  metadata: Metadata;
  code: [] | [string];
  prebuy_amount: [] | [TokenAmount];
}
export type MintResponse = { ok: null } | { err: string };
export interface Operation {
  time: Time;
  typeof: OperationType;
}
export interface OperationAndId {
  id: bigint;
  operation: Operation;
}
export type OperationType =
  | { access: { user: string } }
  | {
      token: {
        tokenid: TokenID;
        deltas: Array<{
          field: string;
          delta:
            | { add: TokenAmount }
            | { sub: TokenAmount }
            | { bool: boolean }
            | { text: string }
            | { amount: TokenAmount };
        }>;
      };
    }
  | {
      trade: {
        amount_token: TokenAmount;
        tokenid: TokenID;
        user: string;
        typeof: TradeType;
        bonded: boolean;
        amount_btc: TokenAmount;
        price: TokenAmount;
      };
    }
  | { other: { data: Metadata; name: string } }
  | { mint: { tokenid: TokenID; data: Metadata } }
  | {
      transaction: {
        tokenid: TokenID;
        balance: TokenAmount;
        metadata: Metadata;
        user: string;
        typeof: { add: null } | { sub: null };
        description: string;
        amount: TokenAmount;
      };
    };
export interface Rune {
  id: string;
  ticker: string;
  name: string;
}
export type Time = bigint;
export interface Token {
  creator: Principal;
  lp_supply: TokenAmount;
  bonded_btc: TokenAmount;
  pool: LiquidityPool;
  rune: [] | [Rune];
  bonding_threshold_reward: TokenAmount;
  supply: TokenAmount;
  icrc_canister: [] | [Principal];
  max_supply: TokenAmount;
  bonding_curve: [] | [BondingCurveSettings];
  bonding_threshold: TokenAmount;
  bonding_threshold_fee: TokenAmount;
}
export type TokenAmount = bigint;
export type TokenID = string;
export type TradeAmount = { btc: TokenAmount } | { token: TokenAmount };
export interface TradeRequest {
  tokenid: TokenID;
  typeof: TradeType;
  settings: [] | [TradeSettings];
  amount: TradeAmount;
}
export type TradeResponse = { ok: null } | { err: string };
export interface TradeSettings {
  slippage: [] | [[TokenAmount, bigint]];
}
export type TradeType = { buy: null } | { sell: null };
export interface TransferRequest {
  to: string;
  tokenid: TokenID;
  amount: TokenAmount;
}
export type TransferResponse = { ok: null } | { err: string };
export type WithdrawProtocol = { btc: null } | { ckbtc: null } | { volt: null };
export interface WithdrawRequest {
  protocol: WithdrawProtocol;
  tokenid: TokenID;
  address: string;
  amount: TokenAmount;
}
export type WithdrawResponse = { ok: boolean } | { err: string };
export interface _ODIN_SERVICE {
  access_grant: ActorMethod<[string], boolean>;
  add_fastbtc: ActorMethod<[Principal, bigint], undefined>;
  admin_access_add: ActorMethod<[Array<string>, string], undefined>;
  admin_discount_add: ActorMethod<[Array<string>, string], undefined>;
  getBalance: ActorMethod<[string, TokenID], TokenAmount>;
  getOperation: ActorMethod<[bigint], [] | [Operation]>;
  getOperations: ActorMethod<[bigint, bigint], Array<OperationAndId>>;
  getToken: ActorMethod<[TokenID], [] | [Token]>;
  icrc10_supported_standards: ActorMethod<[], Array<{ url: string; name: string }>>;
  icrc28_trusted_origins: ActorMethod<[], Array<string>>;
  token_deposit: ActorMethod<[TokenID, TokenAmount], TokenAmount>;
  token_liquidity: ActorMethod<[LiquidityRequest], LiquidityResponse>;
  token_list: ActorMethod<[ListRequest], ListResponse>;
  token_mint: ActorMethod<[MintRequest], MintResponse>;
  token_trade: ActorMethod<[TradeRequest], TradeResponse>;
  token_transfer: ActorMethod<[TransferRequest], TransferResponse>;
  token_withdraw: ActorMethod<[WithdrawRequest], WithdrawResponse>;
  user_claim: ActorMethod<[], TokenAmount>;
  voucher_claim: ActorMethod<[string], [] | [TokenAmount]>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
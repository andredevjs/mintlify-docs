/**
 * Withdrawal protocols supported by the canister
 */
export type WithdrawProtocol = 'btc' | 'ckbtc' | 'volt';

/**
 * Parameters for buying tokens with BTC
 */
export interface BuyTokenParams {
  /** Token ID to buy */
  tokenId: string;

  /** Amount in satoshis */
  btcAmount: bigint;

  /** Optional slippage percentage (0.01 = 1%) */
  slippage?: number;
}

/**
 * Parameters for selling tokens
 */
export interface SellTokenParams {
  /** Token ID to sell */
  tokenId: string;

  /** Amount in token's smallest unit */
  tokenAmount: bigint;

  /** Optional slippage percentage (0.01 = 1%) */
  slippage?: number;

  /** Expected price for slippage calculation */
  expectedPrice?: number;
}

/**
 * Parameters for transferring tokens
 */
export interface TransferTokenParams {
  /** Token ID to transfer */
  tokenId: string;

  /** Recipient principal/address */
  to: string;

  /** Amount in token's smallest unit */
  amount: bigint;
}

/**
 * Parameters for withdrawing BTC
 */
export interface WithdrawBtcParams {
  /** Token to withdraw (usually 'btc') */
  tokenId: string;

  /** Bitcoin address to withdraw to */
  address: string;

  /** Amount in satoshis */
  amount: bigint;

  /** Withdrawal protocol */
  protocol: WithdrawProtocol;
}

/**
 * Parameters for depositing tokens
 */
export interface DepositTokenParams {
  /** Token ID to deposit */
  tokenId: string;

  /** Amount in token's smallest unit */
  amount: bigint;
}

/**
 * Result of a successful transfer operation
 */
export interface TransferResult {
  /** Transaction ID from the canister */
  transactionId: string;

  /** Block index in the ledger */
  blockIndex: bigint;
}

/**
 * Result of a successful deposit operation
 */
export interface DepositResult {
  /** New balance after deposit */
  newBalance: bigint;
}

/**
 * Result of a successful withdrawal operation
 */
export interface WithdrawResult {
  /** Transaction ID from the canister */
  transactionId: string;

  /** Bitcoin transaction ID (if available) */
  btcTxid?: string;
}

/**
 * Token balance information
 */
export interface TokenBalance {
  /** Token ID */
  tokenId: string;

  /** Balance amount in token's smallest unit */
  balance: bigint;

  /** Principal/address of the holder */
  principal: string;
}

/**
 * Canister service interface for direct blockchain operations
 */
export interface CanisterService {
  /** Buy token with BTC */
  buyTokenWithBtc(params: BuyTokenParams): Promise<boolean>;

  /** Sell token amount */
  sellTokenAmount(params: SellTokenParams): Promise<boolean>;

  /** Transfer tokens to another user */
  transferToken(params: TransferTokenParams): Promise<TransferResult>;

  /** Withdraw BTC to external address */
  withdrawBtc(params: WithdrawBtcParams): Promise<WithdrawResult>;

  /** Deposit tokens to the canister */
  depositToken(params: DepositTokenParams): Promise<DepositResult>;
}

/**
 * Result of a successful deposit operation
 */
export interface DepositResult {
  /** New balance after deposit */
  newBalance: bigint;
}

/**
 * Odin Actor Interface
 */
export interface OdinActor {
  /** Deposit tokens to the canister */
  token_deposit(tokenId: string, amount: bigint): Promise<DepositResult>;
}
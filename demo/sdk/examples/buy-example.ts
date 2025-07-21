/**
 * Odin SDK Token Buy Example
 *
 * This example demonstrates how to use the Odin SDK to buy tokens with BTC
 * including authentication, token discovery, and actual purchase operations.
 *
 * Prerequisites:
 * - User must be authenticated via SIWB (see auth-example.ts)
 * - User must have BTC balance deposited
 * - Operations require real funds - use with caution!
 */

import { OdinSDK } from '../src/index';
import { createSampleWallet } from './sample-wallet';

export const BITCOIN = {
  id: 'btc',
  name: 'Bitcoin',
  ticker: 'BTC',
  image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
  rune: null,
  divisibility: 8,
  decimals: 3,
};

async function buyExample() {
  try {
    console.log('🏗️  Odin SDK Token Buy Example');
    console.log('===============================================\n');

    // Initialize the SDK
    const odin = new OdinSDK({
      baseUrl: 'https://api.odin.fun/dev', // Use dev environment
      enableLogging: true,
    });

    // Step 1: Authenticate (required for canister operations)
    console.log('--- 🔐 Step 1: Authentication ---');
    const wallet = await createSampleWallet();
    console.log(`Generated wallet address: ${wallet.address}`);

    const prepareResult = await odin.auth.prepare(wallet.address);
    console.log('✅ SIWB challenge received');

    const signature = await wallet.signMessage(prepareResult.message);
    const authResult = await odin.auth.login({
      address: wallet.address,
      message: prepareResult.message,
      signature: signature,
      publicKey: wallet.publicKey,
      signatureType: 'Bip322Simple',
    });

    console.log('✅ Authentication completed!');
    console.log(`Principal ID: ${authResult.principalId}\n`);

    // Step 2: Deposit BTC for trading (works only in dev)
    console.log('--- 💰 Step 2: Deposit BTC for Trading ---');
    const btc = 0.001;

    const amount = btc * 10 ** (BITCOIN.divisibility + BITCOIN.decimals);
    const depositResult = await odin.canister.depositToken({
      tokenId: 'btc',
      amount: BigInt(amount),
    });

    console.log('✅ BTC deposited for trading!');
    console.log(
      `Available BTC: ${Number(depositResult.newBalance) / 10 ** (BITCOIN.divisibility + BITCOIN.decimals)} BTC`
    );
    console.log('');

    // Step 3: Find Tradable Tokens
    console.log('--- 🔍 Step 3: Find Tradable Tokens ---');
    const tokensResponse = await odin.tokens.getTokens({
      page: 1,
      limit: 50, // Get first 50 tokens
      bonded: true, // Only get bonded tokens for trading
    });

    console.log(
      `Found ${tokensResponse.count} total tokens, checking ${tokensResponse.data.length} for trading...`
    );

    // Filter for tokens that have trading enabled
    const tradableTokens = tokensResponse.data.filter(token => token.trading === true);

    console.log(`Found ${tradableTokens.length} tradable tokens:`);
    tradableTokens.slice(0, 5).forEach(token => {
      console.log(`- ${token.name} (${token.ticker}) - ID: ${token.id}`);
    });

    if (tradableTokens.length === 0) {
      console.log('❌ No tradable tokens found. Exiting example.');
      return;
    }

    // Use first tradable token
    const selectedToken = tradableTokens[0];
    console.log(`🎯 Selected token for buying: ${selectedToken.name} (${selectedToken.ticker})`);
    console.log('');

    // Step 4: Buy Tokens with BTC
    console.log('--- 🛒 Step 4: Buy Tokens with BTC ---');

    try {
      const buyAmount = 0.0001; // 0.0001 BTC for the purchase
      const buyResult = await odin.canister.buyTokenWithBtc({
        tokenId: selectedToken.id,
        btcAmount: BigInt(buyAmount * 10 ** (BITCOIN.divisibility + BITCOIN.decimals)),
        // slippage: 0.05, // 5% slippage tolerance
      });

      if (buyResult) {
        console.log('✅ Token purchase completed successfully!');
        console.log(`Purchased ${selectedToken.name} tokens with ${buyAmount} BTC`);
      } else {
        console.log('❌ Token purchase failed');
        return;
      }
    } catch (error) {
      console.log('❌ Buy failed:', error instanceof Error ? error.message : error);
      if (error instanceof Error && error.message.includes('InsufficientFunds')) {
        console.log('💡 Note: You need sufficient BTC balance to buy tokens');
      }
      return;
    }
    console.log('');

    // Step 5: Sign out
    console.log('--- 👋 Step 5: Sign Out ---');
    await odin.auth.signOut();
    console.log('✅ Signed out successfully');

    console.log('\n🎉 Token buy example completed successfully!');
    console.log('\n📝 Key Notes:');
    console.log('- This example demonstrates real token purchases with BTC');
    console.log('- Always use small amounts for testing');
    console.log('- Handle errors appropriately in production code');
    console.log('- Use proper slippage settings to protect against price changes');
    console.log('- Remember to check balances separately if needed');
  } catch (error) {
    console.error('❌ Buy example failed:', error);

    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
}

// Run the example
if (require.main === module) {
  buyExample().catch(console.error);
}

export { buyExample };

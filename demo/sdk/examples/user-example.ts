import { OdinSDK } from '../src';

/**
 * User Service Example
 *
 * This example demonstrates how to use the UserService to:
 * - Get user information by principal
 * - Get user's token balances and holdings
 * - Get user's activity and transaction history
 * - Get user statistics and achievements
 */

const BITCOIN = {
  divisibility: 8,
  decimals: 3,
};

async function userExample() {
  console.log('👤 Odin User Service Example\n');

  // Initialize the SDK
  const odin = new OdinSDK({
    baseUrl: 'https://api.odin.fun/dev',
    enableLogging: true,
  });

  try {
    // Example principal ID (you can replace this with any valid principal)
    const examplePrincipal = 'lgixi-ze4me-n4pz6-6addm-my7ef-lpcuf-f7lhm-g5o4p-rowrn-xnrga-zae';

    // 1. Get user information
    console.log('--- 👤 Step 1: Get User Information ---');
    try {
      const user = await odin.users.getUser(examplePrincipal);
      console.log(`User Details:
- Principal: ${user.principal}
- Username: ${user.username || 'Not set'}
- Bio: ${user.bio || 'Not set'}
- Admin: ${user.admin}
- Total Asset Value: ${user.total_asset_value}
- Referral Count: ${user.referral_count}
- Referral Earnings: ${user.referral_earnings}
- Created: ${user.created_at}`);
    } catch (error) {
      console.log(
        '❌ Could not fetch user information:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    // 2. Get user's token balances
    console.log('--- 💰 Step 2: Get User Token Balances ---');
    try {
      const balances = await odin.users.getUserBalances(examplePrincipal, {
        page: 1,
        limit: 5,
        sort: 'token_price:desc', // Sort by token price
      });

      console.log(`Found ${balances.count} total balances, showing top ${balances.data.length}:`);
      balances.data.forEach((balance, index) => {
        console.log(`${index + 1}. ${balance.name} (${balance.ticker}):
    - Balance: ${balance.balance / 10 ** (balance.divisibility + balance.decimals)}  ${balance.ticker}
    - Price: ${(balance.token_price / 10 ** 3).toFixed(3)} sats
    - Trading: ${balance.trading ? 'Yes' : 'No'}`);
      });
    } catch (error) {
      console.log(
        '❌ Could not fetch user balances:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    // 3. Get user's owned tokens
    console.log('--- 🪙 Step 3: Get User Owned Tokens ---');
    try {
      const ownedTokens = await odin.users.getUserTokens(examplePrincipal, {
        page: 1,
        limit: 3,
        bonded: false, // Only bonded tokens
      });

      console.log(
        `User owns ${ownedTokens.count} total tokens, showing ${ownedTokens.data.length}:`
      );
      ownedTokens.data.forEach((tokenBalance, index) => {
        console.log(tokenBalance);
        console.log(`${index + 1}. ${tokenBalance.token.name} (${tokenBalance.token.ticker}):
       - Balance: ${tokenBalance.balance / 10 ** (tokenBalance.token.divisibility + tokenBalance.token.decimals)} ${tokenBalance.token.ticker}
       - Market Cap: ${tokenBalance.token.marketcap / 10 ** tokenBalance.token.decimals / 10 ** BITCOIN.divisibility} BTC
       - Trading: ${tokenBalance.token.trading}
       - Bonded: ${tokenBalance.token.bonded}
       - Created: ${tokenBalance.token.created_time}`);
      });
    } catch (error) {
      console.log(
        '❌ Could not fetch owned tokens:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    // 4. Get user's created tokens
    console.log('--- 🏗️  Step 4: Get User Created Tokens ---');
    try {
      const createdTokens = await odin.users.getUserCreatedTokens(examplePrincipal, {
        page: 1,
        limit: 3,
      });

      console.log(
        `User created ${createdTokens.count} total tokens, showing ${createdTokens.data.length}:`
      );
      createdTokens.data.forEach((token, index) => {
        console.log(`${index + 1}. ${token.name} (${token.ticker}):
       - Created: ${token.created_time}
       - Market Cap: ${token.marketcap}
       - Holders: ${token.holder_count}
       - Trading: ${token.trading}`);
      });
    } catch (error) {
      console.log(
        '❌ Could not fetch created tokens:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    // 5. Get user statistics
    console.log('--- 📊 Step 5: Get User Statistics ---');
    try {
      const stats = await odin.users.getUserStats(examplePrincipal);
      console.log(`User Statistics:
    - BTC Holdings: ${stats.data.btc / 10 ** (BITCOIN.divisibility + BITCOIN.decimals)} BTC`);
    } catch (error) {
      console.log(
        '❌ Could not fetch user statistics:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    // 6. Get user activity
    console.log('--- 📈 Step 6: Get User Activity ---');
    try {
      const activity = await odin.users.getUserActivity(examplePrincipal, {
        page: 1,
        limit: 5,
        sort: 'time:desc', // Most recent first
      });

      console.log(
        `Found ${activity.count} total activities, showing latest ${activity.data.length}:`
      );
      activity.data.forEach((act, index) => {
        console.log(`${index + 1}. Action ${act.action}: ${act.description}
       - Token Amount: ${act.token ? act.amount_token / 10 ** act.token.divisibility / 10 ** act.token.decimals : 'N/A'} ${act.token ? act.token.ticker : 'N/A'}
       - BTC Amount: ${act.amount_btc / 10 ** (BITCOIN.divisibility + BITCOIN.decimals) || 'N/A'} BTC
       - Token: ${act.token ? act.token.name : 'N/A'}
       - Time: ${act.time}`);
      });
    } catch (error) {
      console.log(
        '❌ Could not fetch user activity:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    // 7. Get user transactions
    console.log('--- 💸 Step 7: Get User Transactions ---');
    try {
      const transactions = await odin.users.getUserTransactions(examplePrincipal, {
        page: 1,
        limit: 5,
        sort: 'created_time:desc',
      });

      console.log(
        `Found ${transactions.count} total transactions, showing latest ${transactions.data.length}:`
      );
      transactions.data.forEach((tx, index) => {
        console.log(`${index + 1}. ${tx.type} - ${tx.token_name} (${tx.token_ticker}):
       - Amount: ${tx.amount}
       - Price: ${tx.price || 'N/A'}
       - Total Value: ${tx.total_value || 'N/A'}
       - Time: ${tx.created_time}`);
      });
    } catch (error) {
      console.log(
        '❌ Could not fetch user transactions:',
        error instanceof Error ? error.message : error
      );
    }
    console.log('');

    console.log('✅ User service example completed successfully!');

    // Note: Authentication-required operations
    console.log('\n🔐 Note: The following operations require authentication:');
    console.log('- Updating user profile');
    console.log('- Updating username');
    console.log('- Uploading profile image');
    console.log('- Claiming achievements');
    console.log('\nTo use these features, first authenticate using the auth service.');
  } catch (error) {
    console.error('❌ Error:', error);

    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
  }
}

// Run the example
if (require.main === module) {
  userExample().catch(console.error);
}

export { userExample };

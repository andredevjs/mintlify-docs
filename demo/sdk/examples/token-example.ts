import { OdinSDK } from '../src';

/**
 * Token Service Example
 *
 * This example demonstrates how to use the TokenService to:
 * - Get tokens with filtering
 * - Get token details
 * - Get token comments, trades, and price data
 * - Add/remove favorites (requires authentication)
 */

async function main() {
  console.log('🚀 Odin Token Service Example\n');

  // Initialize the SDK
  const odin = new OdinSDK({
    baseUrl: 'https://api.odin.fun/dev',
    enableLogging: true,
  });

  try {
    // 1. Get all tokens with pagination
    console.log('📋 Getting tokens...');
    const tokens = await odin.tokens.getTokens({
      page: 1,
      limit: 2,
      sort: 'marketcap:desc', // Sort by market cap descending
      bonded: true, // Only bonded tokens
    });

    console.log(`Found ${tokens.count} total tokens, showing ${tokens.data.length}:`);
    tokens.data.forEach(token => {
      console.log(`- ${token.name} (${token.ticker}): $${token.price.toFixed(8)} BTC`);
    });

    if (tokens.data.length === 0) {
      console.log('No tokens found. The API might be down or filters too restrictive.');
      return;
    }

    // Use the first token for further examples
    const firstToken = tokens.data[0];
    console.log(`\n🔍 Using token: ${firstToken.name} (${firstToken.id})\n`);

    // 2. Get detailed token information
    console.log('📊 Getting token details...');
    const tokenDetails = await odin.tokens.getToken(firstToken.id);
    console.log(`Token Details:
- Name: ${tokenDetails.name}
- Ticker: ${tokenDetails.ticker}
- Price: ${tokenDetails.price / 10 ** (tokenDetails.decimals + tokenDetails.divisibility)} sats
- Market Cap: ${tokenDetails.marketcap / 10 ** (tokenDetails.decimals + tokenDetails.divisibility) / 10 ** 8} BTC
- Holders: ${tokenDetails.holder_count}
- Volume: ${tokenDetails.volume / 10 ** (tokenDetails.decimals + tokenDetails.divisibility)} sats
- Bonded: ${tokenDetails.bonded}
- Featured: ${tokenDetails.featured}`);

    // 3. Get token comments
    console.log('\n💬 Getting token comments...');
    const comments = await odin.tokens.getTokenComments(firstToken.id, {
      page: 1,
      limit: 2,
    });

    console.log(`Found ${comments.count} total comments, showing latest ${comments.data.length}:`);
    comments.data.forEach(comment => {
      console.log(`- ${comment.user_username || comment.user}: ${comment.message}`);
    });

    // 4. Get token owners/holders
    console.log('\n👥 Getting token holders...');
    const owners = await odin.tokens.getTokenOwners(firstToken.id, {
      page: 1,
      limit: 2,
      sort: 'balance:desc',
    });

    console.log(`Top ${owners.data.length} holders:`);
    owners.data.forEach((owner, index) => {
      console.log(`${index + 1}. ${owner.user_username || owner.user}: ${owner.balance} tokens`);
    });

    // 5. Get token trades
    console.log('\n📈 Getting recent trades...');
    const trades = await odin.tokens.getTokenTrades(firstToken.id, {
      page: 1,
      limit: 2,
      sort: 'time:desc',
    });

    console.log(`Recent ${trades.data.length} trades:`);
    trades.data.forEach(trade => {
      const action = trade.buy ? 'BUY' : 'SELL';
      console.log(
        `- ${action}: ${trade.amount_token} tokens for ${trade.amount_btc} sats by ${trade.user_username || trade.user}`
      );
    });

    // 6. Get token price feed data
    console.log('\n📊 Getting price feed data...');
    const feedData = await odin.tokens.getTokenFeed(firstToken.id, {
      resolution: 1440, // 1 day resolution
    });

    if (feedData.data && feedData.data.length > 0) {
      const latestData = feedData.data[feedData.data.length - 1];
      console.log(`Latest price data:
- Open: ${latestData.open}
- High: ${latestData.high}
- Low: ${latestData.low}
- Close: ${latestData.close}
- Volume: ${latestData.volume}`);
    } else {
      console.log('No price feed data available');
    }

    // 7. Search tokens
    console.log('\n🔍 Searching for tokens containing "odin"...');
    const searchResults = await odin.tokens.getTokens({
      search: 'odin',
      limit: 3,
    });

    console.log(`Found ${searchResults.data.length} tokens matching "odin":`);
    searchResults.data.forEach(token => {
      console.log(`- ${token.name} (${token.ticker})`);
    });

    // 8. Get tokens by various filters
    console.log('\n🎯 Getting featured tokens...');
    const featuredTokens = await odin.tokens.getTokens({
      featured: true,
      limit: 2,
    });

    console.log(`Featured tokens (${featuredTokens.data.length}):`);
    featuredTokens.data.forEach(token => {
      console.log(`- ${token.name} (${token.ticker}) - ${token.description?.substring(0, 50)}...`);
    });

    console.log('\n✅ Token service example completed successfully!');

    // Note: Authentication-required operations
    console.log('\n🔐 Note: The following operations require authentication:');
    console.log('- Adding/removing favorites');
    console.log('- Posting comments');
    console.log('- Voting on comments');
    console.log('- Pinning/unpinning comments (requires token ownership)');
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
  main().catch(console.error);
}

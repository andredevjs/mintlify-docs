# Odin SDK Examples

This directory contains working examples demonstrating how to use the Odin SDK.

## Available Examples

### 1. Authentication Example (`auth-example.ts`)

Demonstrates the complete SIWB (Sign In With Bitcoin) authentication flow:

- **Phase 1**: Prepare authentication with live SIWB canister
- **Phase 2**: Sign message with sample Bitcoin wallet (BIP322)
- **Phase 3**: Complete authentication with delegation identity creation
- **Features**: Live IC integration, real BIP322 signing, JWT token exchange

```bash
npx tsx examples/auth-example.ts
```

### 2. Token Service Example (`token-example.ts`)

Demonstrates comprehensive token operations using the Token API:

- **Token Discovery**: Get tokens with filtering, sorting, and pagination
- **Token Details**: Retrieve detailed token information
- **Market Data**: Access prices, trades, volume, and market cap
- **Social Features**: Get comments, holders, and community data
- **Search & Filter**: Find tokens by name, features, and criteria

```bash
npx tsx examples/token-example.ts
```

### 3. Token Buy Example (`buy-example.ts`)

Demonstrates how to buy tokens with BTC using the Internet Computer canister:

- **Authentication**: Complete SIWB flow for canister access
- **BTC Deposit**: Deposit BTC to the trading canister (dev environment)
- **Token Discovery**: Find and filter tradable tokens
- **Token Purchase**: Buy tokens with BTC including slippage protection
- **Error Handling**: Comprehensive error management for buy operations

```bash
npx tsx examples/buy-example.ts
```

### 4. User Service Example (`user-example.ts`)

Demonstrates comprehensive user operations using the User API:

- **User Information**: Get user details by principal ID
- **Token Holdings**: View user's owned tokens and balances
- **Activity Tracking**: Access user's transaction history and activity
- **Statistics**: Get user portfolio stats and performance data
- **Achievements**: View and manage user achievements
- **User Search**: Find and filter users by various criteria

```bash
npx tsx examples/user-example.ts
```

### 5. Sample Bitcoin Wallet (`sample-wallet.ts`)

A complete Bitcoin Taproot wallet implementation showing:

- **Key Management**: Ed25519 key generation and derivation
- **Address Generation**: Bitcoin Taproot address creation
- **BIP322 Signing**: Real Bitcoin message signing implementation
- **Wallet Interface**: Compatible with SIWB authentication

```bash
npx tsx examples/sample-wallet.ts
```

## Running Examples

### Prerequisites

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Build the SDK**:

   ```bash
   npm run build
   ```

3. **Run any example**:
   ```bash
   npx tsx examples/<example-name>.ts
   ```

### Environment Setup

For authentication examples, ensure you have:

- Internet connection (for live IC canister communication)
- Valid Bitcoin addresses (examples include sample generation)

For canister operations, be aware that:

- **Real funds are used**: All operations use actual BTC and tokens
- **Small amounts recommended**: Start with minimal amounts for testing
- **Network costs apply**: IC network fees and Bitcoin network fees
- **Irreversible operations**: Transfers and withdrawals cannot be undone

### Example Output

Each example includes:

- **Step-by-step progress**: Clear logging of each operation
- **Success confirmations**: Transaction IDs and confirmation details
- **Error handling**: Comprehensive error messages and recovery suggestions
- **Educational notes**: Explanations of what's happening at each step

### Safety Guidelines for Canister Operations

When using the canister operations example:

1. **Start Small**: Use minimal amounts (1000 satoshis = 0.00001 BTC)
2. **Test Environment**: Use development/staging environments when possible
3. **Verify Addresses**: Double-check all recipient addresses for transfers/withdrawals
4. **Monitor Balances**: Check balances before and after operations
5. **Handle Errors**: Implement proper error handling for production use
6. **Slippage Settings**: Use appropriate slippage tolerance for trades
7. **Network Fees**: Factor in IC and Bitcoin network fees for operations

### Getting Help

If you encounter issues:

1. **Check Prerequisites**: Ensure authentication is working first
2. **Review Logs**: Enable logging in the SDK configuration
3. **Small Tests**: Start with minimal amounts and simple operations
4. **Error Messages**: Read error messages carefully for specific guidance
5. **Documentation**: Refer to the main README for additional configuration options

## Example Categories

### **Read-Only Examples** (Safe to run)

- `auth-example.ts` - Authentication flow
- `token-example.ts` - Token data and market information

### **Write Operations** (Use with caution)

- `buy-example.ts` - Token purchasing with BTC
- `user-example.ts` - User information and portfolio data

### **Utility Examples**

- `sample-wallet.ts` - Bitcoin wallet implementation

## What's Working

- **✅ Authentication**: Complete SIWB flow with live IC integration
- **✅ Token API**: Full token discovery, details, and market data
- **✅ Wallet Integration**: Real Bitcoin wallet with BIP322 signing
- **✅ Error Handling**: Comprehensive error management
- **✅ Type Safety**: Full TypeScript support

## Next Steps

These examples serve as:

- **Learning Resources**: Understand Odin SDK architecture
- **Integration Guides**: See how to implement in your applications
- **Testing Tools**: Verify SDK functionality
- **Development References**: Copy patterns for your use cases

## Need Help?

- Check the main [README.md](../README.md) for SDK overview
- Review [design.md](../design.md) for detailed architecture
- See [CHANGELOG.md](../CHANGELOG.md) for latest updates

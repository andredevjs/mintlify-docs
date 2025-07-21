import { login, prepare } from './core/prepare';
import { createSampleWallet } from './sample-wallet';
import { authenticateCallback } from './core/auth-callback';
import { getActor } from './utils/odin';


(async () => {
  const wallet = await createSampleWallet();
  const result = await prepare(wallet.address);

  const signature = await wallet.signMessage(result.message);

  const identity = await login({
    address: wallet.address,
    message: result.message,
    signature: signature,
    publicKey: wallet.publicKey,
    signatureType: 'Bip322Simple',
  });

  // Used for API calls.
  const token = await authenticateCallback(identity);

  const odin = getActor(identity);

  const BITCOIN = {
    id: 'btc',
    name: 'Bitcoin',
    ticker: 'BTC',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    rune: null,
    divisibility: 8,
    decimals: 3,
  };

  const btc = 0.0001; 
  const amount = BigInt(btc * 10 ** (BITCOIN.divisibility + BITCOIN.decimals));
  const newBalance  = await odin.token_deposit(BITCOIN.id, amount);

  console.log({
    newBalance,
  });
})();

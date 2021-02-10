# Anchor.js

Anchor.js is a client SDK for building applications that can interact with Anchor Protocol from within JavaScript runtimes, such as web browsers, server backends, and on mobile through React Native.

You can find a reference of the Anchor.js API [here](https://github.com/Anchor-Protocol/anchor.js).

## Getting Anchor.js

Anchor.js is available as a package on NPM and is intended to be used alongside Terra.js.

Add both:

- `@terra-money/terra.js`
- `@anchor-protocol/anchor.js`

To your JavaScript project's `package.json` as dependencies using your preferred package manager:

```sh
$ npm install -S @terra-money/terra.js @anchor-protocol/anchor.js
```

## Usage

### Message Fabricators

Anchor.js provides facilities for 2 main use cases:

- query: runs smart contract queries through LCD
- execute: creates proper `MsgExecuteContract` objects to be used in transactions

Both of these functions are accessible through the [`Message Fabricators`](https://github.com/Anchor-Protocol/anchor.js/tree/master/src/fabricators).

To Use the message fabricators:

```ts
import {fabricateRedeemStable, fabricateDepositStableCoin} from '@anchor-protocol/anchor.js';
import {contractAddresses, AddressProviderFromJSON} from ".@anchor-protocol/anchor.js";

// default -- uses tequila core contract addresses
const addressProvider = new AddressProviderFromJSON(contractaddresses);
    const redeemMsg = fabricateRedeemStable({
      address: 'terra123...',
      symbol: 'usd',
      amount: '10000',
    })(addressProvider);

    const depositMsg = fabricateDepositStableCoin({
      address: 'terra123...',
      symbol: 'usd',
      amount: '10',
    })(addressProvider);
```

## Executing
A message fabricator contains functions for generating proper `MsgExecuteContract` messages to be included in a transaction and broadcasted.

```ts
import { LCDClient, Wallet, MnemonicKey, StdFee} from '@terra-money/terra.js';

const anchor = new LCDClient({ URL: 'https://tequila-lcd.terra.dev', chainID:'tequila-0004' });
const owner = new MnemonicKey({ mnemonic: "...."});
const wallet = new Wallet(anchor, owner);


async function depositStable() {
    const tx = await wallet.createAndSignTx({
        msgs: depositMsg,
        fee: new StdFee(200_000, { uluna: 20_000_000 })
    });
    return await anchor.tx.broadcast(tx);
}

async function main() {
    await depositStable();
}

main().catch(console.error);
```

## License

This software is licensed under the Apache 2.0 license. Read more about it [here](./LICENSE).

© 2021 Anchor Protocol
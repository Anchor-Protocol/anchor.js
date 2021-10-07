import { BlockTxBroadcastResult, LCDClient, MnemonicKey, Msg, MsgExecuteContract, StdFee, StdTx, Wallet } from "@terra-money/terra.js"
import { AddressProvider, MARKET_DENOMS } from ".."
import { AddressProviderFromJson, columbus5 } from "../address-provider"
import { OperationImpl } from "./operation"

interface TestOption {
  address: string,
  foo: string,
  bar: string,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testFabricator = (option: TestOption) => (_: AddressProvider): Msg[] => {
  return [
    new MsgExecuteContract(
      option.address,
      option.address,
      {
        [option.foo]: option.bar
      }
    )
  ]
}

describe('operation', () => {
  it('generateWithAddress', async () => {
    const testKey = new MnemonicKey()
    const testLCDClient = new LCDClient({ URL: 'https://lcd.terra.dev', chainID: 'columbus-4' })
    const testWallet = new Wallet(testLCDClient, testKey)
    const addressProvider: AddressProvider = new AddressProviderFromJson(columbus5)
    const operation = new OperationImpl(
      testFabricator,
      {
        foo: "hello",
        bar: addressProvider.market(MARKET_DENOMS.UUSD)
      },
      addressProvider
    )

    const expected = [
      new MsgExecuteContract(
        testKey.accAddress,
        testKey.accAddress,
        {
          hello: addressProvider.market(MARKET_DENOMS.UUSD)
        }
      )
    ]

    expect(operation.generateWithAddress(testKey.accAddress)).toStrictEqual(expected)
    expect(operation.generateWithWallet(testWallet)).toStrictEqual(expected)

    testWallet.createAndSignTx = async ({ msgs }) => Promise.resolve(new StdTx(msgs, new StdFee(1, "1uluna"), []))
    testLCDClient.tx.broadcast = async tx => {
      expect(tx.msg).toStrictEqual(expected)
      return Promise.resolve({
        txhash: "hash",
        code: 0,
      }as BlockTxBroadcastResult)
    }

    await operation.execute(testWallet)
  })
})

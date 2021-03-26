import { BlockTxBroadcastResult, Msg, StdFee, Wallet } from "@terra-money/terra.js"
import { AddressProvider } from "../address-provider"

export interface OperationGasParameters {
  fee?: StdFee
  gasAdjustment?: number
}

type Fabricator<T> = (option: T) => (addressProvider: AddressProvider) => Msg[]
type OmitAddress<T> = Omit<T, "address">

export interface Operation {
  generateWithAddress(address: string): Msg[]
  generateWithWallet(wallet: Wallet): Msg[]
  execute(wallet: Wallet, gasParameters: OperationGasParameters): Promise<BlockTxBroadcastResult>
}

export class OperationImpl<FabricatorInputType> implements Operation {
  fabricator!: Fabricator<FabricatorInputType>
  option!: OmitAddress<FabricatorInputType>
  addressProvider!: AddressProvider

  constructor(fabricator: Fabricator<FabricatorInputType>, option: OmitAddress<FabricatorInputType>, addressProvider: AddressProvider) {
    this.fabricator = fabricator
    this.option = option
    this.addressProvider = addressProvider
  }

  generateWithAddress(address: string): Msg[] {
    return this.fabricator({ address, ...this.option } as unknown as FabricatorInputType)(this.addressProvider)
  }

  generateWithWallet(wallet: Wallet): Msg[] {
    return this.generateWithAddress(wallet.key.accAddress)
  }

  async execute(wallet: Wallet, { fee, gasAdjustment }: OperationGasParameters): Promise<BlockTxBroadcastResult> {
    const tx = await wallet.createAndSignTx({
      fee,
      gasAdjustment,
      msgs: this.fabricator({
        address: wallet.key.accAddress,
        ...this.option
      } as unknown as FabricatorInputType)(
        this.addressProvider
      ), 
    })
    return wallet.lcd.tx.broadcast(tx)
  }
}
import {
  BlockTxBroadcastResult,
  Coins,
  Msg,
  Numeric,
  Fee,
  Wallet,
} from '@terra-money/terra.js';
import { Fabricator, OmitAddress } from '..';
import { AddressProvider } from '../address-provider';

export interface OperationGasParameters {
  fee?: Fee;
  gasPrices?: Coins.Input;
  gasAdjustment?: Numeric.Input;
}

export interface Operation {
  generateWithAddress(address: string): Msg[];
  generateWithWallet(wallet: Wallet): Msg[];
  execute(
    wallet: Wallet,
    gasParameters: OperationGasParameters,
  ): Promise<BlockTxBroadcastResult>;
}

export class OperationImpl<FabricatorInputType> implements Operation {
  private _fabricator!: Fabricator<FabricatorInputType>;
  private _option!: OmitAddress<FabricatorInputType>;
  private _addressProvider!: AddressProvider;

  constructor(
    fabricator: Fabricator<FabricatorInputType>,
    option: OmitAddress<FabricatorInputType>,
    addressProvider: AddressProvider,
  ) {
    this._fabricator = fabricator;
    this._option = option;
    this._addressProvider = addressProvider;
  }

  generateWithAddress(address: string): Msg[] {
    return this._fabricator({
      address,
      ...this._option,
    } as unknown as FabricatorInputType)(this._addressProvider);
  }

  generateWithWallet(wallet: Wallet): Msg[] {
    return this.generateWithAddress(wallet.key.accAddress);
  }

  async execute(
    wallet: Wallet,
    { fee, gasPrices, gasAdjustment }: OperationGasParameters = {},
  ): Promise<BlockTxBroadcastResult> {
    const tx = await wallet.createAndSignTx({
      fee,
      gasAdjustment,
      gasPrices,
      msgs: this._fabricator({
        address: wallet.key.accAddress,
        ...this._option,
      } as unknown as FabricatorInputType)(this._addressProvider),
    });
    return wallet.lcd.tx.broadcast(tx);
  }
}

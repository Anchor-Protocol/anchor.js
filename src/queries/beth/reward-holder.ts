import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { Holder } from '..';

interface Option {
  lcd: LCDClient;
  address: string;
}

export const querybEthRewardHolder =
  ({ lcd, address }: Option) =>
  async (addressProvider: AddressProvider): Promise<Holder> => {
    const bAssetContractAddress = addressProvider.bEthReward();
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      holder: {
        address: address,
      },
    });
  };

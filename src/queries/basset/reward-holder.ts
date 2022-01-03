import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  address: string;
}

export interface Holder {
  address: string;
  balance: string;
  index: string;
  pending_rewards: string;
}

export const querybAssetRewardHolder =
  ({ lcd, address }: Option) =>
  async (addressProvider: BAssetAddressProvider): Promise<Holder> => {
    return lcd.wasm.contractQuery(addressProvider.reward(), {
      holder: {
        address: address,
      },
    });
  };

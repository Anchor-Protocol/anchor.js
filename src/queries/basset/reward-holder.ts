import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  address: string;
  bAsset: BAssetAddressProvider;
}

export interface Holder {
  address: string;
  balance: string;
  index: string;
  pending_rewards: string;
}

export const querybAssetRewardHolder =
  ({ lcd, address, bAsset }: Option) =>
  async (_: AddressProvider): Promise<Holder> => {
    return lcd.wasm.contractQuery(bAsset.reward(), {
      holder: {
        address: address,
      },
    });
  };

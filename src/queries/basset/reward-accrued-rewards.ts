import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  address: string;
  bAsset: BAssetAddressProvider;
}

interface AccruedReward {
  rewards: string;
}

export const querybAssetRewardAccrued =
  ({ lcd, address, bAsset }: Option) =>
  async (_: AddressProvider): Promise<AccruedReward> => {
    return lcd.wasm.contractQuery(bAsset.reward(), {
      accrued_rewards: {
        address: address,
      },
    });
  };

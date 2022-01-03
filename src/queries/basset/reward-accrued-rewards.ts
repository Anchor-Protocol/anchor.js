import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  address: string;
}

interface AccruedReward {
  rewards: string;
}

export const querybAssetRewardAccrued =
  ({ lcd, address }: Option) =>
  async (addressProvider: BAssetAddressProvider): Promise<AccruedReward> => {
    return lcd.wasm.contractQuery(addressProvider.reward(), {
      accrued_rewards: {
        address: address,
      },
    });
  };

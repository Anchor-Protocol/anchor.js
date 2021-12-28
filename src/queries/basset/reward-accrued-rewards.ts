import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
  collateral: COLLATERAL_DENOMS;
}

interface AccruedReward {
  rewards: string;
}

export const querybAssetRewardAccrued =
  ({ lcd, address, collateral }: Option) =>
  async (addressProvider: AddressProvider): Promise<AccruedReward> => {
    const bAssetContractAddress = addressProvider.bAssetReward(collateral);
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      accrued_rewards: {
        address: address,
      },
    });
  };

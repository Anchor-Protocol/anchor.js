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

export interface Holder {
  address: string;
  balance: string;
  index: string;
  pending_rewards: string;
}

export const querybAssetRewardHolder =
  ({ lcd, address, collateral }: Option) =>
  async (addressProvider: AddressProvider): Promise<Holder> => {
    const bAssetContractAddress = addressProvider.bAssetReward(collateral);
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      holder: {
        address: address,
      },
    });
  };

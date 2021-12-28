import { LCDClient } from '@terra-money/terra.js';
import { Holder } from '.';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  start_after?: string;
  limit?: number;
  collateral: COLLATERAL_DENOMS;
}

interface Holders {
  holders: Holder[];
}

export const querybAssetRewardHolders =
  ({ lcd, start_after, limit, collateral }: Option) =>
  async (addressProvider: AddressProvider): Promise<Holders> => {
    const bAssetContractAddress = addressProvider.bAssetReward(collateral);
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      holders: {
        start_after: start_after,
        limit: limit,
      },
    });
  };

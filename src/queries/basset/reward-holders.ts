import { LCDClient } from '@terra-money/terra.js';
import { Holder } from '.';
import { BAssetAddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  start_after?: string;
  limit?: number;
}

interface Holders {
  holders: Holder[];
}

export const querybAssetRewardHolders =
  ({ lcd, start_after, limit }: Option) =>
  async (addressProvider: BAssetAddressProvider): Promise<Holders> => {
    return lcd.wasm.contractQuery(addressProvider.reward(), {
      holders: {
        start_after: start_after,
        limit: limit,
      },
    });
  };

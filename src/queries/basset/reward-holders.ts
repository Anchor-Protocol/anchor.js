import { LCDClient } from '@terra-money/terra.js';
import { Holder } from '.';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  bAsset: BAssetAddressProvider;
  start_after?: string;
  limit?: number;
}

interface Holders {
  holders: Holder[];
}

export const querybAssetRewardHolders =
  ({ lcd, bAsset, start_after, limit }: Option) =>
  async (_: AddressProvider): Promise<Holders> => {
    return lcd.wasm.contractQuery(bAsset.reward(), {
      holders: {
        start_after: start_after,
        limit: limit,
      },
    });
  };

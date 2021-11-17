import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { Holder } from '../../queries';

interface Option {
  lcd: LCDClient;
  start_after?: string;
  limit?: number;
}

interface Holders {
  holders: Holder[];
}

export const querybEthRewardHolders =
  ({ lcd, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<Holders> => {
    const bAssetContractAddress = addressProvider.bEthReward();
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      holders: {
        start_after: start_after,
        limit: limit,
      },
    });
  };

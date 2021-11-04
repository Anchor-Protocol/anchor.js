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

export const queryRewardHolders =
  ({ lcd, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<Holders> => {
    const bAssetContractAddress = addressProvider.bLunaReward();
    const response: Holders = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        holders: {
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

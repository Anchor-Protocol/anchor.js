import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../..';
import { AddressProvider } from '../../address-provider/provider';
import { BorrowerResponse } from '../../queries';

interface Option {
  lcd: LCDClient;
  bAsset: BAssetAddressProvider;
  start_after?: string;
  limit?: number;
}

interface BorrowersResponse {
  borrowers: BorrowerResponse[];
}

export const queryCustodyBorrowers =
  ({ lcd, bAsset, start_after, limit }: Option) =>
  async (_: AddressProvider): Promise<BorrowersResponse> => {
    const response: BorrowersResponse = await lcd.wasm.contractQuery(
      bAsset.custody(),
      {
        borrowers: {
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

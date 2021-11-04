import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';
import { BorrowInfoResponse } from '../../queries';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
  start_after?: string;
  limit?: number;
}
interface BorrowerInfosResponse {
  borrower_infos: BorrowInfoResponse[];
}

export const queryMarketBorrowerInfos =
  ({ lcd, market, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<BorrowerInfosResponse> => {
    const marketContractAddress = addressProvider.market(market);
    const response: BorrowerInfosResponse = await lcd.wasm.contractQuery(
      marketContractAddress,
      {
        borrower_infos: {
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

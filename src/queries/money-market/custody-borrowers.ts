import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from '../../address-provider/provider';
import { BorrowerResponse } from '../../queries';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
  collateral: COLLATERAL_DENOMS;
  start_after?: string;
  limit?: number;
}
interface BorrowersResponse {
  borrowers: BorrowerResponse[];
}

export const queryCustodyBorrowers =
  ({ lcd, market, collateral, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<BorrowersResponse> => {
    const custodyContractAddress = addressProvider.custody(market, collateral);
    const response: BorrowersResponse = await lcd.wasm.contractQuery(
      custodyContractAddress,
      {
        borrowers: {
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

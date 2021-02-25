import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
  startAfter?: string;
  limit?: number;
}
interface BorrowerInfosResponse {
  borrower_infos: object[];
}

export const queryMarketBorrowerInfos = ({
  lcd,
  market,
  startAfter,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BorrowerInfosResponse> => {
  const marketContractAddress = addressProvider.market(market);
  let response: BorrowerInfosResponse = await lcd.wasm.contractQuery(
    marketContractAddress,
    {
      borrower_infos: {
        start_after: startAfter,
        limit: limit,
      },
    },
  );
  return response;
};

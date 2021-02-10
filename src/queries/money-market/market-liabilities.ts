import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
  startAfter?: string;
  limit?: number;
}
interface LiabilitiesResponse {
  liabilities: object[];
}

export const queryMarketLiabilities = ({
  lcd,
  market,
  startAfter,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<LiabilitiesResponse> => {
  const marketContractAddress = addressProvider.market(market);
  let response: LiabilitiesResponse = await lcd.wasm.contractQuery(
    marketContractAddress,
    {
      liabilities: {
        start_after: startAfter,
        limit: limit,
      },
    },
  );
  return response;
};

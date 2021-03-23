import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  start_after?: string;
  limit?: number;
}
interface PricesResponse {
  prices: PricesResponseElem[];
}

interface PricesResponseElem {
  asset: string;
  price: string;
  last_update_time: number;
}

export const queryOraclePrices = ({
  lcd,
  start_after,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<PricesResponse> => {
  const oracleContractAddress = addressProvider.oracle();
  const response: PricesResponse = await lcd.wasm.contractQuery(
    oracleContractAddress,
    {
      prices: {
        start_after: start_after,
        limit: limit,
      },
    },
  );
  return response;
};

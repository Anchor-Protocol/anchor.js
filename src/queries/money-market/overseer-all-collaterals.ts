import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: MARKET_DENOMS;
  start_after?: string;
  limit?: number;
}
interface AllCollateralsResponse {
  all_collaterals: CollateralsResponse[];
}

interface CollateralsResponse {
  borrower: string;
  collaterals: Array<[string, string]>;
}

export const queryOverseerAllCollaterals =
  ({ lcd, overseer, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<AllCollateralsResponse> => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    const response: AllCollateralsResponse = await lcd.wasm.contractQuery(
      overseerContractAddress,
      {
        all_collaterals: {
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

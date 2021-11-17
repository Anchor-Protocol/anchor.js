import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: MARKET_DENOMS;
  borrower: string;
}
interface CollateralResponse {
  borrower: string;
  collaterals: Array<[string, string]>;
}

export const queryOverseerCollaterals =
  ({ lcd, overseer, borrower }: Option) =>
  async (addressProvider: AddressProvider): Promise<CollateralResponse> => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    const response: CollateralResponse = await lcd.wasm.contractQuery(
      overseerContractAddress,
      {
        collaterals: {
          borrower: borrower,
        },
      },
    );
    return response;
  };

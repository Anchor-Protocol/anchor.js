import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
  custody: COLLATERAL_DENOMS | string;
  address: string;
}
export interface BorrowerResponse {
  borrower: string;
  balance: string;
  spendable: string;
}

export const queryCustodyBorrower =
  ({ lcd, market, custody, address }: Option) =>
  async (addressProvider: AddressProvider): Promise<BorrowerResponse> => {
    const custodyAddress = custody.startsWith('terra1')
      ? custody
      : addressProvider.custody(market, custody as COLLATERAL_DENOMS);

    return lcd.wasm.contractQuery<BorrowerResponse>(custodyAddress, {
      borrower: {
        address: address,
      },
    });
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market_balance: string;
  total_liabilities: string;
  total_reserves: string;
}
interface BorrowRateResponse {
  rate: string;
}

export const queryInterestModelBorrowRate =
  ({ lcd, market_balance, total_liabilities, total_reserves }: Option) =>
  async (addressProvider: AddressProvider): Promise<BorrowRateResponse> => {
    const interestModelContractAddress = addressProvider.interest();
    const response: BorrowRateResponse = await lcd.wasm.contractQuery(
      interestModelContractAddress,
      {
        borrow_rate: {
          market_balance: market_balance,
          total_liabilities: total_liabilities,
          total_reserves: total_reserves,
        },
      },
    );
    return response;
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  marketBalance: string;
  totalLiabilities: string;
  totalReserves: string;
}
interface BorrowRateResponse {
  rate: string;
}

export const queryInterestModelBorrowRate = ({
  lcd,
  marketBalance,
  totalLiabilities,
  totalReserves,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BorrowRateResponse> => {
  const interestModelContractAddress = addressProvider.interest();
  let response: BorrowRateResponse = await lcd.wasm.contractQuery(
    interestModelContractAddress,
    {
      borrow_rate: {
        market_balance: marketBalance,
        total_liabilities: totalLiabilities,
        total_reserves: totalReserves,
      },
    },
  );
  return response;
};

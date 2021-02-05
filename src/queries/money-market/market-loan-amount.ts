import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
  borrower: string;
  blockHeight: number;
}
interface LoanAmountResponse {
  borrower: string;
  loanAmount: string;
}

export const queryMarketLoanAmount = ({
  lcd,
  market,
  borrower,
  blockHeight,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<LoanAmountResponse> => {
  const marketContractAddress = addressProvider.market(market);
  let response: LoanAmountResponse = await lcd.wasm.contractQuery(
    marketContractAddress,
    {
      loan_amount: {
        borrower: borrower,
        block_height: +blockHeight,
      },
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
  borrower: string;
  block_height: number;
}
export interface BorrowInfoResponse {
  borrower: string;
  interest_index: string;
  reward_index: string;
  loan_amount: string;
  pending_rewards: string;
}

export const queryMarketBorrowerInfo = ({
  lcd,
  market,
  borrower,
  block_height,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BorrowInfoResponse> => {
  const marketContractAddress = addressProvider.market(market);
  const response: BorrowInfoResponse = await lcd.wasm.contractQuery(
    marketContractAddress,
    {
      borrower_info: {
        borrower: borrower,
        block_height,
      },
    },
  );
  return response;
};

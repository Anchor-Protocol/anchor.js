import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
  borrower: string;
  block_height: number;
}
interface LiabilityResponse {
  borrower: string;
  interestIndex: string;
  rewardIndex: string;
  loanAmount: string;
  pendingRewards: string;
}

export const queryMarketBorrowerInfo = ({
  lcd,
  market,
  borrower,
  block_height,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<LiabilityResponse> => {
  const marketContractAddress = addressProvider.market(market);
  let response: LiabilityResponse = await lcd.wasm.contractQuery(
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

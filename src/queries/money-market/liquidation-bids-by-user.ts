import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bidder: string;
  startAfter?: string;
  limit?: number;
}
interface BidsByUserResponse {
  bids: object[];
}

export const queryLiquidationBidsByUser = ({
  lcd,
  bidder,
  startAfter,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BidsByUserResponse> => {
  const liquidationContractAddress = addressProvider.liquidation();
  let response: BidsByUserResponse = await lcd.wasm.contractQuery(
    liquidationContractAddress,
    {
      bids_by_user: { bidder: bidder, start_after: startAfter, limit: limit },
    },
  );
  return response;
};

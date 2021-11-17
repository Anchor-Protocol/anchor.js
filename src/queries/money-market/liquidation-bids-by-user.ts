import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { BidResponse } from '../../queries';

interface Option {
  lcd: LCDClient;
  bidder: string;
  start_after?: string;
  limit?: number;
}
interface BidsByUserResponse {
  bids: BidResponse[];
}

export const queryLiquidationBidsByUser =
  ({ lcd, bidder, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<BidsByUserResponse> => {
    const liquidationContractAddress = addressProvider.liquidation();
    const response: BidsByUserResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bids_by_user: {
          bidder: bidder,
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bid_idx: string;
}
export interface QueueBidResponse {
  idx: string;
  collateral_token: string;
  premium_slot: number;
  bidder: string;
  amount: string;
  product_snapshot: string;
  sum_snapshot: string;
  pending_liquidated_collateral: string;
  wait_end: number | undefined;
  epoch_snapshot: string;
  scale_snapshot: string;
}

export const queryLiquidationQueueBid =
  ({ lcd, bid_idx }: Option) =>
  async (addressProvider: AddressProvider): Promise<QueueBidResponse> => {
    const liquidationContractAddress = addressProvider.liquidationQueue();
    const response: QueueBidResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bid: {
          bid_idx,
        },
      },
    );
    return response;
  };

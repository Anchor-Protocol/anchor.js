import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  collateral_token: string;
  bid_slot: number;
}

export interface BidPoolResponse {
  sum_snapshot: string;
  product_snapshot: string;
  total_bid_amount: string;
  premium_rate: string;
  current_epoch: string;
  current_scale: string;
}

export const queryLiquidationQueueBidPool =
  ({ lcd, collateral_token, bid_slot }: Option) =>
  async (addressProvider: AddressProvider): Promise<BidPoolResponse> => {
    const liquidationContractAddress = addressProvider.liquidationQueue();
    const response: BidPoolResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bid_pool: {
          collateral_token,
          bid_slot,
        },
      },
    );
    return response;
  };

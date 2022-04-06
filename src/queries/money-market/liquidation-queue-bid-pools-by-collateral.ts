import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { BidPoolResponse } from './liquidation-queue-bid-pool';

interface Option {
  lcd: LCDClient;
  collateral_token: string;
  start_after: number | undefined;
  limit: number | undefined;
}

export interface BidPoolsByCollateralResponse {
  bid_pools: BidPoolResponse[];
}

export const queryLiquidationQueueBidPoolsByCollateral =
  ({ lcd, collateral_token, start_after, limit }: Option) =>
  async (
    addressProvider: AddressProvider,
  ): Promise<BidPoolsByCollateralResponse> => {
    const liquidationContractAddress = addressProvider.liquidationQueue();
    const response: BidPoolsByCollateralResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bid_pools_by_collateral: {
          collateral_token,
          start_after,
          limit,
        },
      },
    );
    return response;
  };

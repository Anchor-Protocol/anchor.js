import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { QueueBidResponse } from './liquidation-queue-bid';

interface Option {
  lcd: LCDClient;
  collateral_token: string;
  bidder: string;
  start_after: string | undefined;
  limit: number | undefined;
}

export const queryLiquidationQueueBidByUser =
  ({ lcd, collateral_token, bidder, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<QueueBidResponse[]> => {
    const liquidationContractAddress = addressProvider.liquidationQueue();
    const response: QueueBidResponse[] = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bids_by_user: {
          collateral_token,
          bidder,
          start_after,
          limit,
        },
      },
    );
    return response;
  };

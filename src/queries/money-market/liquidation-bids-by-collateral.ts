import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { BidResponse } from '../../queries';

interface Option {
  lcd: LCDClient;
  collateral_token: string;
  start_after?: string;
  limit?: number;
}
interface BidsByCollateralResponse {
  bids: BidResponse[];
}

export const queryLiquidationBidsByCollateral =
  ({ lcd, collateral_token, start_after, limit }: Option) =>
  async (
    addressProvider: AddressProvider,
  ): Promise<BidsByCollateralResponse> => {
    const liquidationContractAddress = addressProvider.liquidation();
    const response: BidsByCollateralResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bids_by_collateral: {
          collateral_token: collateral_token,
          start_after: start_after,
          limit: limit,
        },
      },
    );
    return response;
  };

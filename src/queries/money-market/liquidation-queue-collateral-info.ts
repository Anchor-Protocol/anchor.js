import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  collateral_token: string;
}
interface CollateralInfoResponse {
  collateral_token: string;
  bid_threshold: string;
  max_slot: number;
  premium_rate_per_slot: string;
}

export const queryLiquidationQueueCollateralInfo =
  ({ lcd, collateral_token }: Option) =>
  async (addressProvider: AddressProvider): Promise<CollateralInfoResponse> => {
    const liquidationContractAddress = addressProvider.liquidationQueue();
    const response: CollateralInfoResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        collateral_info: {
          collateral_token,
        },
      },
    );
    return response;
  };

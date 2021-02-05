import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  collateralToken: string;
  startAfter?: string;
  limit?: number;
}
interface BidsByCollateralResponse {
  bids: object[];
}

export const queryLiquidationBidsByCollateral = ({
  lcd,
  collateralToken,
  startAfter,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BidsByCollateralResponse> => {
  const liquidationContractAddress = addressProvider.liquidation();
  let response: BidsByCollateralResponse = await lcd.wasm.contractQuery(
    liquidationContractAddress,
    {
      bids_by_collateral: {
        collateral_token: collateralToken,
        start_after: startAfter,
        limit: +limit,
      },
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  collateralToken: string;
  bidder: string;
}
interface BidResponse {
  collateralToken: string;
  bidder: string;
  amount: string;
  premiumRate: string;
}

export const queryLiquidationBid = ({
  lcd,
  collateralToken,
  bidder,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BidResponse> => {
  const liquidationContractAddress = addressProvider.liquidation();
  let response: BidResponse = await lcd.wasm.contractQuery(
    liquidationContractAddress,
    {
      bid: { collateral_token: collateralToken, bidder: bidder },
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  collateral_token: string;
  bidder: string;
}

export interface BidResponse {
  collateral_token: string;
  bidder: string;
  amount: string;
  premium_rate: string;
}

export const queryLiquidationBid =
  ({ lcd, collateral_token, bidder }: Option) =>
  async (addressProvider: AddressProvider): Promise<BidResponse> => {
    const liquidationContractAddress = addressProvider.liquidation();
    const response: BidResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        bid: { collateral_token: collateral_token, bidder: bidder },
      },
    );
    return response;
  };

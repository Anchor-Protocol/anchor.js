import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  borrowAmount: string;
  borrowLimit: string;
  collaterals: object;
  collateralPrices: object[];
}
interface LiquidationAmountResponse {
  collaterals: object[];
}

export const queryLiquidationLiquidationAmount = ({
  lcd,
  borrowAmount,
  borrowLimit,
  collaterals,
  collateralPrices,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<LiquidationAmountResponse> => {
  const liquidationContractAddress = addressProvider.liquidation();
  let response: LiquidationAmountResponse = await lcd.wasm.contractQuery(
    liquidationContractAddress,
    {
      liquidation_amount: {
        borrow_amount: borrowAmount,
        borrow_limit: borrowLimit,
        collaterals: collaterals,
        collateral_prices: collateralPrices,
      },
    },
  );
  return response;
};

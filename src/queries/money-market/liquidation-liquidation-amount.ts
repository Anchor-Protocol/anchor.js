import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  borrow_amount: string;
  borrow_limit: string;
  collaterals: Array<[string, string]>;
  collateral_prices: string[];
}
interface LiquidationAmountResponse {
  collaterals: Array<[string, string]>;
}

export const queryLiquidationLiquidationAmount =
  ({
    lcd,
    borrow_amount,
    borrow_limit,
    collaterals,
    collateral_prices,
  }: Option) =>
  async (
    addressProvider: AddressProvider,
  ): Promise<LiquidationAmountResponse> => {
    const liquidationContractAddress = addressProvider.liquidation();
    const response: LiquidationAmountResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        liquidation_amount: {
          borrow_amount: borrow_amount,
          borrow_limit: borrow_limit,
          collaterals: collaterals,
          collateral_prices: collateral_prices,
        },
      },
    );
    return response;
  };

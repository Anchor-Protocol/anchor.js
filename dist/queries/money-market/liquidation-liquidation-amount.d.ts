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
export declare const queryLiquidationLiquidationAmount: ({ lcd, borrowAmount, borrowLimit, collaterals, collateralPrices, }: Option) => (addressProvider: AddressProvider) => Promise<LiquidationAmountResponse>;
export {};

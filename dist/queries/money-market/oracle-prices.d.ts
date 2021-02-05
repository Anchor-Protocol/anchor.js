import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    startAfter?: string;
    limit?: number;
}
interface PricesResponse {
    prices: object[];
}
export declare const queryOraclePrices: ({ lcd, startAfter, limit }: Option) => (addressProvider: AddressProvider) => Promise<PricesResponse>;
export {};

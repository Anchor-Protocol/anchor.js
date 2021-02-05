import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    base: string;
    quote: string;
}
interface PriceResponse {
    rate: string;
    lastUpdatedBase: number;
    lastUpdatedQuote: number;
}
export declare const queryOraclePrice: ({ lcd, base, quote }: Option) => (addressProvider: AddressProvider) => Promise<PriceResponse>;
export {};

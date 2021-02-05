import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
    startAfter?: string;
    limit?: number;
}
interface LiabilitiesResponse {
    liabilities: object[];
}
export declare const queryMarketLiabilities: ({ lcd, market, startAfter, limit, }: Option) => (addressProvider: AddressProvider) => Promise<LiabilitiesResponse>;
export {};

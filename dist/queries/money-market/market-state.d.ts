import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
}
interface StateResponse {
    totalLiabilites: string;
    totalReserves: string;
    lastInterestUpdated: number;
    globalInterestIndex: string;
}
export declare const queryMarketState: ({ lcd, market }: Option) => (addressProvider: AddressProvider) => Promise<StateResponse>;
export {};

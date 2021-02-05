import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    marketBalance: string;
    totalLiabilities: string;
    totalReserves: string;
}
interface BorrowRateResponse {
    rate: string;
}
export declare const queryInterestModelBorrowRate: ({ lcd, marketBalance, totalLiabilities, totalReserves, }: Option) => (addressProvider: AddressProvider) => Promise<BorrowRateResponse>;
export {};

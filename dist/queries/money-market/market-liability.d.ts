import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
    borrower: string;
}
interface LiabilityResponse {
    borrower: string;
    interestIndex: string;
    loanAmount: string;
}
export declare const queryMarketLiability: ({ lcd, market, borrower, }: Option) => (addressProvider: AddressProvider) => Promise<LiabilityResponse>;
export {};

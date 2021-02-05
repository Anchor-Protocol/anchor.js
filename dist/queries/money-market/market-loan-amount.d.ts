import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
    borrower: string;
    blockHeight: number;
}
interface LoanAmountResponse {
    borrower: string;
    loanAmount: string;
}
export declare const queryMarketLoanAmount: ({ lcd, market, borrower, blockHeight, }: Option) => (addressProvider: AddressProvider) => Promise<LoanAmountResponse>;
export {};

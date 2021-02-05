import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
    borrower: string;
    blockTime?: number;
}
interface BorrowLimitResponse {
    borrower: string;
    borrowLimit: string;
}
export declare const queryOverseerBorrowLimit: ({ lcd, overseer, borrower, blockTime, }: Option) => (addressProvider: AddressProvider) => Promise<BorrowLimitResponse>;
export {};

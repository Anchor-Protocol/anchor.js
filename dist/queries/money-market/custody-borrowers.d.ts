import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    custody: string;
    startAfter?: string;
    limit?: number;
}
interface BorrowersResponse {
    borrowers: object[];
}
export declare const queryCustodyBorrowers: ({ lcd, custody, startAfter, limit, }: Option) => (addressProvider: AddressProvider) => Promise<BorrowersResponse>;
export {};

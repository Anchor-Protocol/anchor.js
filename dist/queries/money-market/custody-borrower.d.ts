import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    custody: string;
    address: string;
}
interface BorrowerResponse {
    borrower: string;
    balance: string;
    spendable: string;
}
export declare const queryCustodyBorrower: ({ lcd, custody, address, }: Option) => (addressProvider: AddressProvider) => Promise<BorrowerResponse>;
export {};

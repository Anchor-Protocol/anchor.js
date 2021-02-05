import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    startAfter?: string;
    lim?: number;
}
interface AllAccounts {
    accounts: object[];
}
export declare const queryTokenAllAccounts: ({ lcd, bAsset, startAfter, lim, }: Option) => (addressProvider: AddressProvider) => Promise<AllAccounts>;
export {};

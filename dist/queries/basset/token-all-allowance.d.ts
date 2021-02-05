import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    owner: string;
    startAfter?: string;
    lim?: number;
}
interface AllAllowance {
    allowances: object[];
}
export declare const queryTokenAllAllowance: ({ lcd, bAsset, owner, startAfter, lim, }: Option) => (addressProvider: AddressProvider) => Promise<AllAllowance>;
export {};

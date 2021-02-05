import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    startAfter?: string;
    lim?: number;
}
interface Holders {
    holders: object[];
}
export declare const queryRewardHolders: ({ lcd, bAsset, startAfter, lim, }: Option) => (addressProvider: AddressProvider) => Promise<Holders>;
export {};

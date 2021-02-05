import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    owner: string;
    spender: string;
}
interface Allowance {
    allowance: string;
    expires: object;
}
export declare const queryTokenAllowance: ({ lcd, bAsset, owner, spender, }: Option) => (addressProvider: AddressProvider) => Promise<Allowance>;
export {};

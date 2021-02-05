import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    address: string;
}
interface Balance {
    rewards: string;
}
export declare const queryTokenBalance: ({ lcd, bAsset, address }: Option) => (addressProvider: AddressProvider) => Promise<Balance>;
export {};

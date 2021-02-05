import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    address: string;
}
interface Holder {
    address: string;
    balance: string;
    index: string;
    pending_rewards: string;
}
export declare const queryRewardHolder: ({ lcd, bAsset, address }: Option) => (addressProvider: AddressProvider) => Promise<Holder>;
export {};

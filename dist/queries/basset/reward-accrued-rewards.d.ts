import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    address: string;
}
interface AccruedReward {
    rewards: string;
}
export declare const queryRewardAccrued: ({ lcd, bAsset, address }: Option) => (addressProvider: AddressProvider) => Promise<AccruedReward>;
export {};

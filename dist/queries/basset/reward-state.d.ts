import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface StateResponse {
    global_index: string;
    total_balance: string;
    prev_reward_balance: string;
}
export declare const queryRewardState: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<StateResponse>;
export {};

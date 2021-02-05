import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface ConfigResponse {
    hub_contract: string;
    reward_denom: string;
}
export declare const queryRewardConfig: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

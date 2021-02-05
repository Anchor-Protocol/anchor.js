import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface ConfigResponse {
    owner: string;
    reward_contract?: string;
    token_contract?: string;
}
export declare const queryHubConfig: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

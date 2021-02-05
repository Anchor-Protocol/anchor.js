import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
}
interface ConfigResponse {
    owner: string;
    baseAsset: string;
}
export declare const queryOracleConfig: ({ lcd }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

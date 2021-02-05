import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
}
interface ConfigResponse {
    owner: string;
    baseRate: string;
    interestMultiplier: string;
}
export declare const queryInterestModelConfig: ({ lcd }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

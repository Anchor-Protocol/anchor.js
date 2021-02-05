import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
}
interface ConfigResponse {
    ownerAddr: string;
    anchorToken: string;
    interestModel: string;
    overseerContract: string;
    stableDenom: string;
    reserveFactor: string;
}
export declare const queryMarketConfig: ({ lcd, market }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

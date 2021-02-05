import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface WhitelistedValResponse {
    validators: object[];
}
export declare const queryHubWhiteVals: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<WhitelistedValResponse>;
export {};

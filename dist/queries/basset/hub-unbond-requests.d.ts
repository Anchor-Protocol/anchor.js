import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    address: string;
}
interface UnbondResponse {
    address: string;
    requestes: object[];
}
export declare const queryHubUnbond: ({ lcd, bAsset, address }: Option) => (addressProvider: AddressProvider) => Promise<UnbondResponse>;
export {};

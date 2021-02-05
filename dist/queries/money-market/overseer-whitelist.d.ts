import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
    collateralToken?: string;
    startAfter?: string;
    limit?: number;
}
interface WhitelistResponse {
    elems: object[];
}
export declare const queryOverseerWhitelist: ({ lcd, overseer, collateralToken, startAfter, limit, }: Option) => (addressProvider: AddressProvider) => Promise<WhitelistResponse>;
export {};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
    startAfter?: string;
    limit?: number;
}
interface AllCollateralsResponse {
    allCollaterals: object[];
}
export declare const queryOverseerAllCollaterals: ({ lcd, overseer, startAfter, limit, }: Option) => (addressProvider: AddressProvider) => Promise<AllCollateralsResponse>;
export {};

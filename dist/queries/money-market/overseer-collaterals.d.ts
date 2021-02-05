import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
    borrower: string;
}
interface CollateralResponse {
    borrower: string;
    collaterals: object;
}
export declare const queryOverseerCollaterals: ({ lcd, overseer, borrower, }: Option) => (addressProvider: AddressProvider) => Promise<CollateralResponse>;
export {};

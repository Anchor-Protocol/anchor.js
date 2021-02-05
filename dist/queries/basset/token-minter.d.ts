import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface MinterResponse {
    minter: string;
    cap?: string;
}
export declare const queryTokenMinter: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<MinterResponse>;
export {};

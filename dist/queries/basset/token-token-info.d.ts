import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface TokenInfoResponse {
    name: string;
    symbol: string;
    decimals: number;
    total_supply: number;
}
export declare const queryTokenInfo: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<TokenInfoResponse>;
export {};

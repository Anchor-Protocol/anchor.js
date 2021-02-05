import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    address: string;
    block_time: number;
}
interface WithdrableResponse {
    withdrawable: string;
}
export declare const queryHubWithdrawable: ({ lcd, bAsset, address, block_time, }: Option) => (addressProvider: AddressProvider) => Promise<WithdrableResponse>;
export {};

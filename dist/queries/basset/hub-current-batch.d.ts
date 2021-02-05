import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
}
interface CurrentBatchResponse {
    id: number;
    requested_with_fee: string;
}
export declare const queryHubCurrentBatch: ({ lcd, bAsset }: Option) => (addressProvider: AddressProvider) => Promise<CurrentBatchResponse>;
export {};

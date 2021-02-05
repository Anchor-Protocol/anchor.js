import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bAsset: string;
    startFrom?: number;
    lim?: number;
}
interface HistoryResponse {
    history: object[];
}
export declare const queryHubHistory: ({ lcd, bAsset, startFrom, lim, }: Option) => (addressProvider: AddressProvider) => Promise<HistoryResponse>;
export {};

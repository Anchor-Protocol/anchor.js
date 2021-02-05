import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
    blockHeight?: number;
}
interface EpochStateResponse {
    exchangeRate: string;
    aTokenSupply: string;
}
export declare const queryMarketEpochState: ({ lcd, market, blockHeight, }: Option) => (addressProvider: AddressProvider) => Promise<EpochStateResponse>;
export {};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
}
interface EpochStateResponse {
    depositRate: string;
    prevATokenSupply: string;
    prevExchangeRate: string;
    lastExecutedHeight: number;
}
export declare const queryOverseerEpochState: ({ lcd, overseer }: Option) => (addressProvider: AddressProvider) => Promise<EpochStateResponse>;
export {};

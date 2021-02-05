import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
}
interface ConfigResponse {
    owner: string;
    oracleContract: string;
    stableDenom: string;
    safeRatio: string;
    bidFee: string;
    maxPremiumRate: string;
    liquidationThreshold: string;
    priceTimeframe: number;
}
export declare const queryLiquidationConfig: ({ lcd }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

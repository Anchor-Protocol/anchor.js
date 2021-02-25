import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
}
interface ConfigResponse {
    ownerAddr: string;
    oracleContract: string;
    marketContract: string;
    liquidationContract: string;
    distributionThresholdRate: string;
    targetDepositRate: string;
    bufferDistributionFactor: string;
    stableDenom: string;
    epochPeriod: number;
    priceTimeframe: number;
}
export declare const queryOverseerConfig: ({ lcd, overseer }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

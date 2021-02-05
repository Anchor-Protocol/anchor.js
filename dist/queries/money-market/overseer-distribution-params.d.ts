import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    overseer: string;
}
interface DistributionParamsResponse {
    depositRate: string;
    targetDepositRate: string;
    distributionThreshold: string;
}
export declare const queryOverseerDistributionParams: ({ lcd, overseer, }: Option) => (addressProvider: AddressProvider) => Promise<DistributionParamsResponse>;
export {};

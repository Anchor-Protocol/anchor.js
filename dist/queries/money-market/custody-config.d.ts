import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    custody: string;
}
interface ConfigResponse {
    collateralToken: string;
    overseerContract: string;
    marketContract: string;
    rewardContract: string;
    liquidationContract: string;
    stableDenom: string;
}
export declare const queryCustodyConfig: ({ lcd, custody }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

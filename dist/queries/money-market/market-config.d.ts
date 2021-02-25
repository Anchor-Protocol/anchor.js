import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    market: string;
}
interface BAssetInfo {
    name: string;
    symbol: string;
    decimals: number;
}
interface ConfigResponse {
    owner: string;
    collateralToken: string;
    overseerContract: string;
    marketContract: string;
    rewardContract: string;
    liquidationContract: string;
    stableDenom: string;
    bassetInfo: BAssetInfo;
}
export declare const queryMarketConfig: ({ lcd, market }: Option) => (addressProvider: AddressProvider) => Promise<ConfigResponse>;
export {};

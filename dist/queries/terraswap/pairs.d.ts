import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
}
interface PairInfo {
    assetInfos: object[];
    contractAddr: string;
    liquidityToken: string;
}
export declare const queryPair: ({ lcd }: Option) => (addressProvider: AddressProvider) => Promise<PairInfo>;
export {};

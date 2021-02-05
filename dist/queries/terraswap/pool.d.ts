import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
}
interface PoolResponse {
    assets: object[];
    total_share: string;
}
export declare const queryPool: ({ lcd }: Option) => (addressProvider: AddressProvider) => Promise<PoolResponse>;
export {};

import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
declare type Expire = {
    at_height: number;
} | {
    at_time: number;
} | {
    never: {};
};
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    spender: string;
    expires?: Expire;
}
export declare const fabricatebAssetIncreaseAllowance: ({ address, amount, bAsset, spender, expires, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

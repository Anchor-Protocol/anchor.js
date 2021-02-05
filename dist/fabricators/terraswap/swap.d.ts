import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    to?: string;
    beliefPrice?: string;
    maxSpread?: string;
}
export declare const fabricatebSwapbLuna: ({ address, amount, bAsset, to, beliefPrice, maxSpread, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

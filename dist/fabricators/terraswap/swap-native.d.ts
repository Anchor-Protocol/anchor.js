import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    denom: string;
    to?: string;
    beliefPrice?: string;
    maxSpread?: string;
}
export declare const fabricatebSwapLuna: ({ address, amount, to, beliefPrice, maxSpread, denom, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

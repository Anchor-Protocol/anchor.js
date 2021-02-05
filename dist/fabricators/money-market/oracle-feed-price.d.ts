import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
declare type Price = [string, Dec];
interface Option {
    address: string;
    prices: [Price];
}
export declare const fabricatebOracleFeedPrice: ({ address, prices }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

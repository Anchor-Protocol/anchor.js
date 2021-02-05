import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    bAsset: string;
}
export declare const fabricatebCheckSlashing: ({ address, bAsset }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

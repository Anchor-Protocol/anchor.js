import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
}
export declare const fabricatebAssetBurn: ({ address, amount, bAsset }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    owner: string;
}
export declare const fabricatebAssetBurnFrom: ({ address, amount, bAsset, owner, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

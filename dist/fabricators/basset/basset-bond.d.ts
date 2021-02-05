import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    validator: string;
}
export declare const fabricatebAssetBond: ({ address, amount, bAsset, validator, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

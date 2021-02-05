import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    recipient: string;
}
export declare const fabricatebAssetTransfer: ({ address, amount, bAsset, recipient, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

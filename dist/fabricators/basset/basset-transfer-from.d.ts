import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    owner: string;
    recipient: string;
}
export declare const fabricatebAssetTransferFrom: ({ address, amount, bAsset, owner, recipient, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
interface Option {
    address: string;
    bAsset: string;
    recipient?: string;
}
export declare const fabricatebAssetClaim: ({ address, bAsset, recipient, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

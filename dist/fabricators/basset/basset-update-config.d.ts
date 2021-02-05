import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    bAsset: string;
    owner?: string;
    reward_contract?: string;
    token_contract?: string;
}
export declare const fabricatebAssetConfig: ({ address, owner, reward_contract, token_contract, bAsset, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

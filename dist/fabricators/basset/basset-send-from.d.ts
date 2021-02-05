import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    owner: string;
    contract: string;
    msg?: string;
}
export declare const fabricatebAssetSendFrom: ({ address, amount, bAsset, contract, owner, msg, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

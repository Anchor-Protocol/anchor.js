import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    amount: string;
    bAsset: string;
    contract: string;
    msg?: object;
}
export declare const fabricatebAssetSend: ({ address, amount, bAsset, contract, msg, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

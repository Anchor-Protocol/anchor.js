import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    bAsset: string;
    nativeToken: string;
}
export declare const fabricatebTerraSwapCreatePair: ({ address, bAsset, nativeToken, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

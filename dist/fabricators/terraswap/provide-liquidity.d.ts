import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    bAsset: string;
    tokenAmount: string;
    nativeAmount: string;
    quote: string;
    slippageTolerance?: string;
}
export declare const fabricateTerraSwapProvideLiquidity: ({ address, slippageTolerance, bAsset, tokenAmount, nativeAmount, quote, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

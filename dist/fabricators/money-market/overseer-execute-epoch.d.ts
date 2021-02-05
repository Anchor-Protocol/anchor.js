import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    overseer: string;
}
export declare const fabricatebOverseerEpoch: ({ address, overseer }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

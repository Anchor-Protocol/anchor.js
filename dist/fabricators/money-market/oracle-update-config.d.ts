import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    owner?: string;
}
export declare const fabricatebOracleConfig: ({ address, owner }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

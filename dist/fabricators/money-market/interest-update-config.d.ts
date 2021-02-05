import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    owner?: string;
    base_rate?: Dec;
    interest_multiplier?: Dec;
}
export declare const fabricatebInterestConfig: ({ address, owner, base_rate, interest_multiplier, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

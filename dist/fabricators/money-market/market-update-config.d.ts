import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    market: string;
    owner_addr?: string;
    interest_model?: string;
    reserve_factor?: Dec;
}
export declare const fabricatebMarketConfig: ({ address, owner_addr, interest_model, reserve_factor, market, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

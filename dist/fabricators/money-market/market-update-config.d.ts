import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    market: string;
    owner_addr?: string;
    interest_model?: string;
    distribution_model?: string;
    reserve_factor?: string;
    max_borrow_factor?: string;
}
export declare const fabricatebMarketConfig: ({ address, owner_addr, interest_model, distribution_model, reserve_factor, max_borrow_factor, market, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

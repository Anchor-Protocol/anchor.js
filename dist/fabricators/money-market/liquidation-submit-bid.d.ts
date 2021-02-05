import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    collateral_token: string;
    premium_rate: Dec;
}
export declare const fabricateSubmitBid: ({ address, collateral_token, premium_rate, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

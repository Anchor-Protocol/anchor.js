import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    collateral_token: string;
    amount: string | undefined;
}
export declare const fabricateRetractBid: ({ address, collateral_token, amount, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

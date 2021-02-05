import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    overseer: string;
    collateral_token: string;
    custody_contract: string;
    ltv?: Dec;
}
export declare const fabricatebOverseerWhiteList: ({ address, overseer, collateral_token, custody_contract, ltv, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

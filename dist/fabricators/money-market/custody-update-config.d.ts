import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    liquidation_contract?: string;
    custody: string;
}
export declare const fabricatebCustodyConfig: ({ address, liquidation_contract, custody, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

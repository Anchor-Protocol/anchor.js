import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    market: string;
    overseer_contract: string;
}
export declare const fabricatebMarketRegOverseer: ({ address, overseer_contract, market, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

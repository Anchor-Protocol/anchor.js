import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    overseer: string;
    owner_addr?: string;
    oracle_contract?: string;
    liquidation_contract?: string;
    distribution_threshold?: Dec;
    target_deposit_rate?: Dec;
    buffer_distribution_rate?: Dec;
    epoch_period?: number;
    price_timeframe?: number;
}
export declare const fabricatebOverseerConfig: ({ address, overseer, owner_addr, oracle_contract, liquidation_contract, distribution_threshold, target_deposit_rate, buffer_distribution_rate, epoch_period, price_timeframe, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

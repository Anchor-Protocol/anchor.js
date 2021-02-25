import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    overseer: string;
    owner_addr?: string;
    oracle_contract?: string;
    liquidation_contract?: string;
    threshold_deposit_rate?: Dec;
    target_deposit_rate?: Dec;
    buffer_distribution_factor?: Dec;
    epoch_period?: number;
    price_timeframe?: number;
}
export declare const fabricatebOverseerConfig: ({ address, overseer, owner_addr, oracle_contract, liquidation_contract, threshold_deposit_rate, target_deposit_rate, buffer_distribution_factor, epoch_period, price_timeframe, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    owner?: string;
    oracle_contract?: string;
    stable_denom?: string;
    safe_ratio?: Dec;
    bid_fee?: Dec;
    max_premium_rate?: Dec;
    liquidation_threshold?: number;
    price_timeframe?: number;
}
export declare const fabricateLiquidationConfig: ({ address, owner, oracle_contract, stable_denom, safe_ratio, bid_fee, max_premium_rate, liquidation_threshold, price_timeframe, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

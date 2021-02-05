import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    bAsset: string;
    epoch_period?: number;
    underlying_coin_denom?: string;
    unbonding_period?: number;
    peg_recovery_fee?: number;
    er_threshold?: number;
    reward_denom?: string;
}
export declare const fabricatebAssetParams: ({ address, epoch_period, underlying_coin_denom, unbonding_period, peg_recovery_fee, er_threshold, reward_denom, bAsset, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};

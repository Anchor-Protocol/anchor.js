import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

export interface RewardInfoResponse {
  staker: string;
  index: string;
  bond_amount: string;
  pending_reward: string;
}

export const queryStakingRewardInfo =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<RewardInfoResponse> => {
    const staking = addressProvider.staking();
    const response: RewardInfoResponse = await lcd.wasm.contractQuery(staking, {
      reward_info: {},
    });
    return response;
  };

import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

export interface PoolInfoResponse {
  total_bond_amount: string;
  reward_index: string;
  pending_reward: string;
}

export const queryStakingPoolInfo = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<PoolInfoResponse> => {
  const staking = addressProvider.staking();
  let response: PoolInfoResponse = await lcd.wasm.contractQuery(staking, {
    pool_info: {},
  });
  return response;
};

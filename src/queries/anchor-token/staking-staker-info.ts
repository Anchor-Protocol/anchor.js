import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  staker: string;
  block_height?: number;
}

export interface StakerInfoResponse {
  staker: string;
  reward_index: string;
  bond_amount: string;
  pending_reward: string;
}

export const queryStakingStaker =
  ({ lcd, staker, block_height }: Option) =>
  async (addressProvider: AddressProvider): Promise<StakerInfoResponse> => {
    const staking = addressProvider.staking();
    const response: StakerInfoResponse = await lcd.wasm.contractQuery(staking, {
      staker_info: {
        staker,
        block_height,
      },
    });
    return response;
  };

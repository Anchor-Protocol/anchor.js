import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  block_height?: string;
}

interface StateResponse {
  last_distributed: number;
  total_bond_amount: string;
  global_reward_index: string;
}

export const queryStakingState =
  ({ lcd, block_height }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const staking = addressProvider.staking();
    const response: StateResponse = await lcd.wasm.contractQuery(staking, {
      state: {
        block_height,
      },
    });
    return response;
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
}

interface StateResponse {
  global_index: string;
  total_balance: string;
  prev_reward_balance: string;
}

export const queryRewardState =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const bAssetContractAddress = addressProvider.bLunaReward();
    const response: StateResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        state: {},
      },
    );
    return response;
  };

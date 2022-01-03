import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
}

interface StateResponse {
  global_index: string;
  total_balance: string;
  prev_reward_balance: string;
}

export const querybAssetRewardState =
  ({ lcd }: Option) =>
  async (addressProvider: BAssetAddressProvider): Promise<StateResponse> => {
    return lcd.wasm.contractQuery(addressProvider.reward(), {
      state: {},
    });
  };

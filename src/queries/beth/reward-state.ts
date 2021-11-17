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

export const querybEthRewardState =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const bAssetContractAddress = addressProvider.bEthReward();
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      state: {},
    });
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider, COLLATERAL_DENOMS } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  collateral: COLLATERAL_DENOMS;
}

interface StateResponse {
  global_index: string;
  total_balance: string;
  prev_reward_balance: string;
}

export const querybAssetRewardState =
  ({ lcd, collateral }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const bAssetContractAddress = addressProvider.bAssetReward(collateral);
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      state: {},
    });
  };

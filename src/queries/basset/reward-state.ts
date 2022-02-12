import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  bAsset: BAssetAddressProvider;
}

interface StateResponse {
  global_index: string;
  total_balance: string;
  prev_reward_balance: string;
}

export const querybAssetRewardState =
  ({ lcd, bAsset }: Option) =>
  async (_: AddressProvider): Promise<StateResponse> => {
    return lcd.wasm.contractQuery(bAsset.reward(), {
      state: {},
    });
  };

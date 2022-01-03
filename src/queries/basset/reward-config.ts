import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
}

interface ConfigResponse {
  hub_contract: string;
  reward_denom: string;
}

export const querybAssetRewardConfig =
  ({ lcd }: Option) =>
  async (addressProvider: BAssetAddressProvider): Promise<ConfigResponse> => {
    return lcd.wasm.contractQuery(addressProvider.reward(), {
      config: {},
    });
  };

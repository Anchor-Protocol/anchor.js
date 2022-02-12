import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  bAsset: BAssetAddressProvider;
}

interface ConfigResponse {
  hub_contract: string;
  reward_denom: string;
}

export const querybAssetRewardConfig =
  ({ lcd, bAsset }: Option) =>
  async (_: AddressProvider): Promise<ConfigResponse> => {
    return lcd.wasm.contractQuery(bAsset.reward(), {
      config: {},
    });
  };

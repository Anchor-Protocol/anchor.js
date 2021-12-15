import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider, COLLATERAL_DENOMS } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  collateral: COLLATERAL_DENOMS;
}

interface ConfigResponse {
  hub_contract: string;
  reward_denom: string;
}

export const querybAssetRewardConfig =
  ({ lcd, collateral }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const bAssetContractAddress = addressProvider.bAssetReward(collateral);
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      config: {},
    });
  };

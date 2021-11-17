import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  hub_contract: string;
  reward_denom: string;
}

export const querybEthRewardConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const bAssetContractAddress = addressProvider.bEthReward();
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      config: {},
    });
  };

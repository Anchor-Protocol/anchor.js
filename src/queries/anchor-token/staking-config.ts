import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface ConfigResponse {
  anchor_token: string;
  staking_token: string;
  distribution_schedule: Array<[number, number, string]>;
}

export const queryStakingConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const staking = addressProvider.staking();
    const response: ConfigResponse = await lcd.wasm.contractQuery(staking, {
      config: {},
    });
    return response;
  };

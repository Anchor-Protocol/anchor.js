import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

export interface ConfigResponse {
  gov_contract: string;
  terraswap_factory: string;
  anchor_token: string;
  distributor_contract: string;
  reward_factor: string;
}

export const queryCollectorConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const collector = addressProvider.collector();
    const response: ConfigResponse = await lcd.wasm.contractQuery(collector, {
      config: {},
    });
    return response;
  };

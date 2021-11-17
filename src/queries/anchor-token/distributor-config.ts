import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface ConfigResponse {
  gov_contract: string;
  anchor_token: string;
  whitelist: string[];
  spend_limit: string;
}

export const queryDistributortConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const distributor = addressProvider.distributor();
    const response: ConfigResponse = await lcd.wasm.contractQuery(distributor, {
      config: {},
    });
    return response;
  };

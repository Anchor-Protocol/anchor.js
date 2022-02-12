import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface ConfigResponse {
  gov_contract: string;
  anchor_token: string;
  spend_limit: string;
}

export const queryCommunityConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const community = addressProvider.community();
    const response: ConfigResponse = await lcd.wasm.contractQuery(community, {
      config: {},
    });
    return response;
  };

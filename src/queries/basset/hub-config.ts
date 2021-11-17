import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  reward_contract?: string;
  token_contract?: string;
  airdrop_registry_contract?: string;
}

export const queryHubConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

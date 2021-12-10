import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
}
interface WhitelistedValResponse {
  validators: string[];
}

export const queryHubWhiteVals =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<WhitelistedValResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: WhitelistedValResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        whitelisted_validators: {},
      },
    );
    return response;
  };

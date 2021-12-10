import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
}
interface WhitelistedValResponse {
  validators: string[];
}

interface ValidatorsRegistryResponse {
  total_delegated: string;
  address: string;
}

export const queryHubWhiteVals =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<WhitelistedValResponse> => {
    const bAssetValidatorsRegistryAddress =
      addressProvider.bLunaValidatorsRegistry();
    if (bAssetValidatorsRegistryAddress) {
      const validatorsRegistryResponse: ValidatorsRegistryResponse[] =
        await lcd.wasm.contractQuery(bAssetValidatorsRegistryAddress, {
          get_validators_for_delegation: {},
        });
      if (!validatorsRegistryResponse || !validatorsRegistryResponse.length) {
        throw new Error('No validators found');
      }
      return {
        validators: validatorsRegistryResponse.map(({ address }) => address),
      };
    }
    const bAssetContractAddress = addressProvider.bLunaHub();
    const hubResponse: WhitelistedValResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        whitelisted_validators: {},
      },
    );
    return hubResponse;
  };

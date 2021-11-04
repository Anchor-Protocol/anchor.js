import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  address: string;
}

export interface UnbondResponse {
  address: string;
  requests: Array<[number, string]>;
}

export const queryHubUnbond =
  ({ lcd, address }: Option) =>
  async (addressProvider: AddressProvider): Promise<UnbondResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: UnbondResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        unbond_requests: {
          address: address,
        },
      },
    );
    return response;
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface CurrentBatchResponse {
  id: number;
  requested_with_fee: string;
}

export const queryHubCurrentBatch =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<CurrentBatchResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: CurrentBatchResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        current_batch: {},
      },
    );
    return response;
  };

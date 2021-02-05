import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
}

interface CurrentBatchResponse {
  id: number;
  requested_with_fee: string;
}

export const queryHubCurrentBatch = ({ lcd, bAsset }: Option) => async (
  addressProvider: AddressProvider,
): Promise<CurrentBatchResponse> => {
  const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
  let reponse: CurrentBatchResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      current_batch: {},
    },
  );
  return reponse;
};

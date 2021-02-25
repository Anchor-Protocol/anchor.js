import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  startFrom?: number;
  lim?: number;
}

interface HistoryResponse {
  history: object[];
}

export const queryHubHistory = ({
  lcd,
  bAsset,
  startFrom,
  lim,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<HistoryResponse> => {
  const bAssetContractAddress = addressProvider.blunaHub(bAsset);
  let reponse: HistoryResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      all_history: {
        start_from: startFrom || undefined,
        limit: lim || undefined,
      },
    },
  );
  return reponse;
};

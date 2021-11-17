import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  start_from?: number;
  limit?: number;
}

interface HistoryResponse {
  history: UnbondHistory[];
}

interface UnbondHistory {
  batch_id: number;
  time: number;
  amount: string;
  applied_exchange_rate: string;
  withdraw_rate: string;
  released: boolean;
}

export const queryHubHistory =
  ({ lcd, start_from, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<HistoryResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: HistoryResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        all_history: {
          start_from: start_from || undefined,
          limit: limit || undefined,
        },
      },
    );
    return response;
  };

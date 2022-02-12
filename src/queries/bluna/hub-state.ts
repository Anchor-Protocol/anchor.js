import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
}

interface StateResponse {
  exchange_rate: string; //deprecated
  bluna_exchange_rate: string;
  stluna_exchange_rate: string;
  total_bond_amount: string; //deprecated
  total_bond_bluna_amount: string;
  total_bond_stluna_amount: string;
  last_index_modification: number;
  prev_hub_balance: string;
  actual_unbonded_amount: string;
  last_unbonded_time: number;
  last_processed_batch: number;
}

export const queryHubState =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: StateResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        state: {},
      },
    );
    return response;
  };

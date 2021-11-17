import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface ParamsResponse {
  epoch_period: number;
  underlying_coin_denom: string;
  unbonding_period: number;
  peg_recovery_fee: string;
  er_threshold: string;
  reward_denom: string;
}

export const queryHubParams =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ParamsResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: ParamsResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        parameters: {},
      },
    );
    return response;
  };

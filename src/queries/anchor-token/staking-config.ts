import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface ConfigResponse {
  anchor_token: string;
  staking_token: string;
}

export const queryStakingConfig = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const staking = addressProvider.staking();
  let response: ConfigResponse = await lcd.wasm.contractQuery(staking, {
    config: {},
  });
  return response;
};

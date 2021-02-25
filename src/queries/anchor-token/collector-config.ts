import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

export interface ConfigResponse {
  gov_contract: string;
  terraswap_factory: string;
  anchor_token: string;
  faucet_contract: string;
  reward_weight: string;
}

export const queryCollectorConfig = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const collector = addressProvider.collector();
  let response: ConfigResponse = await lcd.wasm.contractQuery(collector, {
    config: {},
  });
  return response;
};

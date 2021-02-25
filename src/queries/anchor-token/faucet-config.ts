import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface ConfigResponse {
  gov_contract: string;
  anchor_token: string;
  whitelist: string[];
  spend_limit: string;
}

export const queryFaucetConfig = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const faucet = addressProvider.faucet();
  let response: ConfigResponse = await lcd.wasm.contractQuery(faucet, {
    config: {},
  });
  return response;
};

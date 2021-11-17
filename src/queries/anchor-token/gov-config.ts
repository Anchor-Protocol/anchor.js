import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  quorum: string;
  threshold: string;
  voting_period: number;
  timelock_period: number;
  expiration_period: number;
  proposal_deposit: string;
  snapshot_period: number;
}

export const queryGovConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const gov = addressProvider.gov();
    const response: ConfigResponse = await lcd.wasm.contractQuery(gov, {
      config: {},
    });
    return response;
  };

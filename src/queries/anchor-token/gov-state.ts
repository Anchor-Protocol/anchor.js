import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface StateResponse {
  poll_count: number;
  total_share: string;
  total_deposit: string;
}

export const queryGovState =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const gov = addressProvider.gov();
    const response: StateResponse = await lcd.wasm.contractQuery(gov, {
      state: {},
    });
    return response;
  };

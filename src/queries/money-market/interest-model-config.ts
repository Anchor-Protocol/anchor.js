import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  base_rate: string;
  interest_multiplier: string;
}

export const queryInterestModelConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const interestModelContractAddress = addressProvider.interest();
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      interestModelContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

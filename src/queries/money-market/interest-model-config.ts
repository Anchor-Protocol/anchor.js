import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  baseRate: string;
  interestMultiplier: string;
}

export const queryInterestModelConfig = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const interestModelContractAddress = addressProvider.interest();
  let response: ConfigResponse = await lcd.wasm.contractQuery(
    interestModelContractAddress,
    {
      config: {},
    },
  );
  return response;
};

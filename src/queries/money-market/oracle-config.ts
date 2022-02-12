import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  base_asset: string;
}

export const queryOracleConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const oracleContractAddress = addressProvider.oracle();
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      oracleContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

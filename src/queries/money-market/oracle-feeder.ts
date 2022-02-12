import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  asset: string;
}
interface FeederResponse {
  asset: string;
  feeder: string;
}

export const queryOracleFeeder =
  ({ lcd, asset }: Option) =>
  async (addressProvider: AddressProvider): Promise<FeederResponse> => {
    const oracleContractAddress = addressProvider.oracle();
    const response: FeederResponse = await lcd.wasm.contractQuery(
      oracleContractAddress,
      {
        feeder: {
          asset: asset,
        },
      },
    );
    return response;
  };

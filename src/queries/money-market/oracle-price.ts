import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  base: string;
  quote: string;
}
interface PriceResponse {
  rate: string;
  last_updated_base: number;
  last_updated_quote: number;
}

export const queryOraclePrice =
  ({ lcd, base, quote }: Option) =>
  async (addressProvider: AddressProvider): Promise<PriceResponse> => {
    const oracleContractAddress = addressProvider.oracle();
    const response: PriceResponse = await lcd.wasm.contractQuery(
      oracleContractAddress,
      {
        price: {
          base: base,
          quote: quote,
        },
      },
    );
    return response;
  };

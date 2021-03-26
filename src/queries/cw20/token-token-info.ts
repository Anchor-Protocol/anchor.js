import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from 'src/address-provider';

interface Option {
  lcd: LCDClient;
  token_address: string,
}

interface TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number;
}

export const queryTokenInfo = ({ lcd, token_address }: Option) => async (
  _: AddressProvider,
): Promise<TokenInfoResponse> => {
  const response: TokenInfoResponse = await lcd.wasm.contractQuery(
    token_address,
    {
      token_info: {},
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number;
}

export const queryTokenInfo = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<TokenInfoResponse> => {
  const bAssetContractAddress = addressProvider.bLunaToken();
  const response: TokenInfoResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      token_info: {},
    },
  );
  return response;
};

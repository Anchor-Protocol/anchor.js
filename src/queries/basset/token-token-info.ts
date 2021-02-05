import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
}

interface TokenInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number;
}

export const queryTokenInfo = ({ lcd, bAsset }: Option) => async (
  addressProvider: AddressProvider,
): Promise<TokenInfoResponse> => {
  const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
  let reponse: TokenInfoResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      token_info: {},
    },
  );
  return reponse;
};

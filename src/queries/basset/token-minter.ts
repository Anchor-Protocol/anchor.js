import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}

interface MinterResponse {
  minter: string;
  cap?: string;
}

export const queryTokenMinter = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<MinterResponse> => {
  const bAssetContractAddress = addressProvider.bLunaToken();
  const response: MinterResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      minter: {},
    },
  );
  return response;
};

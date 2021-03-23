import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
}
interface Balance {
  rewards: string;
}

export const queryTokenBalance = ({ lcd, address }: Option) => async (
  addressProvider: AddressProvider,
): Promise<Balance> => {
  const bAssetContractAddress = addressProvider.bLunaToken();
  const response: Balance = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      balance: {
        address: address,
      },
    },
  );
  return response;
};

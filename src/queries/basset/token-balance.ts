import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  address: string;
}
interface Balance {
  rewards: string;
}

export const queryTokenBalance = ({ lcd, bAsset, address }: Option) => async (
  addressProvider: AddressProvider,
): Promise<Balance> => {
  const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
  let reponse: Balance = await lcd.wasm.contractQuery(bAssetContractAddress, {
    balance: {
      address: address,
    },
  });
  return reponse;
};

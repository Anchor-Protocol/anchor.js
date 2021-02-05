import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  owner: string;
  spender: string;
}
interface Allowance {
  allowance: string;
  expires: object;
}

export const queryTokenAllowance = ({
  lcd,
  bAsset,
  owner,
  spender,
}: Option) => async (addressProvider: AddressProvider): Promise<Allowance> => {
  const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
  let reponse: Allowance = await lcd.wasm.contractQuery(bAssetContractAddress, {
    allowance: {
      owner: owner,
      spender: spender,
    },
  });
  return reponse;
};

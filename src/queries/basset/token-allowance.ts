import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { Expire } from 'fabricators';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  owner: string;
  spender: string;
}
interface Allowance {
  allowance: string;
  expires: Expire;
}

export const queryTokenAllowance = ({ lcd, owner, spender }: Option) => async (
  addressProvider: AddressProvider,
): Promise<Allowance> => {
  const bAssetContractAddress = addressProvider.bLunaToken();
  const response: Allowance = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      allowance: {
        owner: owner,
        spender: spender,
      },
    },
  );
  return response;
};

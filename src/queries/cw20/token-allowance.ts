import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { Expire } from '../../fabricators';

interface Option {
  lcd: LCDClient;
  token_address: string,
  owner: string;
  spender: string;
}
interface Allowance {
  allowance: string;
  expires: Expire;
}

export const queryTokenAllowance = ({ lcd, token_address, owner, spender }: Option) => async (
  _: AddressProvider,
): Promise<Allowance> => {
  const response: Allowance = await lcd.wasm.contractQuery(
    token_address,
    {
      allowance: {
        owner: owner,
        spender: spender,
      },
    },
  );
  return response;
};

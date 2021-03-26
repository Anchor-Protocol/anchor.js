import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
  token_address: string,
}

interface Balance {
  balance: string;
}

export const queryTokenBalance = ({ lcd, address, token_address }: Option) => async (
  _: AddressProvider,
): Promise<Balance> => {
  const response: Balance = await lcd.wasm.contractQuery(
    token_address,
    {
      balance: {
        address: address,
      },
    },
  );
  return response;
};

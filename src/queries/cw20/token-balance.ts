import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
  token_address: string;
}

interface Balance {
  balance: string;
}

export const queryTokenBalance =
  ({ lcd, address, token_address }: Option) =>
  async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: AddressProvider,
  ): Promise<Balance> => {
    return lcd.wasm.contractQuery<Balance>(token_address, {
      balance: {
        address: address,
      },
    });
  };

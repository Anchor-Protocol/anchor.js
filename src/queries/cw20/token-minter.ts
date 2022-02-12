import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  token_address: string;
}

interface MinterResponse {
  minter: string;
  cap?: string;
}

export const queryTokenMinter =
  ({ lcd, token_address }: Option) =>
  async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: AddressProvider,
  ): Promise<MinterResponse> => {
    return lcd.wasm.contractQuery<MinterResponse>(token_address, {
      minter: {},
    });
  };

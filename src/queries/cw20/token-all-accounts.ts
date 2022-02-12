import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  token_address: string;
  start_after?: string;
  limit?: number;
}

interface AllAccounts {
  accounts: string[];
}

export const queryTokenAllAccounts =
  ({ lcd, token_address, start_after, limit }: Option) =>
  async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: AddressProvider,
  ): Promise<AllAccounts> => {
    return lcd.wasm.contractQuery<AllAccounts>(token_address, {
      all_accounts: {
        start_after: start_after || undefined,
        limit: limit || undefined,
      },
    });
  };

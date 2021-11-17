/* eslint-disable @typescript-eslint/no-unused-vars */
import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { Expire } from '../../fabricators';

interface Option {
  lcd: LCDClient;
  owner: string;
  token_address: string;
  start_after?: string;
  lim?: number;
}

interface AllAllowance {
  allowances: AllowanceResponse[];
}

interface AllowanceResponse {
  allowance: string;
  expires: Expire;
}

export const queryTokenAllowances =
  ({ lcd, owner, token_address, start_after, lim }: Option) =>
  async (_: AddressProvider): Promise<AllAllowance> => {
    const response: AllAllowance = await lcd.wasm.contractQuery(token_address, {
      all_allowances: {
        owner: owner,
        start_after: start_after,
        limit: lim,
      },
    });
    return response;
  };

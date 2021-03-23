import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { Expire } from 'fabricators';

interface Option {
  lcd: LCDClient;
  owner: string;
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

export const queryTokenAllowances = ({
  lcd,
  owner,
  start_after,
  lim,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<AllAllowance> => {
  const bAssetContractAddress = addressProvider.bLunaToken();
  const response: AllAllowance = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      all_allowances: {
        owner: owner,
        start_after: start_after,
        limit: lim,
      },
    },
  );
  return response;
};

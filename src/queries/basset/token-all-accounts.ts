import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  start_after?: string;
  limit?: number;
}

interface AllAccounts {
  accounts: string[];
}

export const queryTokenAllAccounts = ({
  lcd,
  start_after,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<AllAccounts> => {
  const bAssetContractAddress = addressProvider.bLunaToken();
  const response: AllAccounts = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      all_accounts: {
        start_after: start_after || undefined,
        limit: limit || undefined,
      },
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  startAfter?: string;
  lim?: number;
}

interface AllAccounts {
  accounts: object[];
}

export const queryTokenAllAccounts = ({
  lcd,
  bAsset,
  startAfter,
  lim,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<AllAccounts> => {
  const bAssetContractAddress = addressProvider.blunaToken(bAsset);
  let reponse: AllAccounts = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      all_accounts: {
        start_after: startAfter || undefined,
        limit: lim || undefined,
      },
    },
  );
  return reponse;
};

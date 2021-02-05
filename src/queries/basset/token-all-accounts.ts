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
  const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
  let reponse: AllAccounts = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      all_accounts: {
        start_after: startAfter,
        limit: +lim,
      },
    },
  );
  return reponse;
};

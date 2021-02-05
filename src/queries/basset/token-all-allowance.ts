import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  owner: string;
  startAfter?: string;
  lim?: number;
}

interface AllAllowance {
  allowances: object[];
}

export const queryTokenAllAllowance = ({
  lcd,
  bAsset,
  owner,
  startAfter,
  lim,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<AllAllowance> => {
  const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
  let reponse: AllAllowance = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      all_allowances: {
        owner: owner,
        start_after: startAfter,
        limit: lim,
      },
    },
  );
  return reponse;
};

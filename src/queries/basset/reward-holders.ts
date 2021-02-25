import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  startAfter?: string;
  lim?: number;
}

interface Holders {
  holders: object[];
}

export const queryRewardHolders = ({
  lcd,
  bAsset,
  startAfter,
  lim,
}: Option) => async (addressProvider: AddressProvider): Promise<Holders> => {
  const bAssetContractAddress = addressProvider.blunaReward(bAsset);
  let reponse: Holders = await lcd.wasm.contractQuery(bAssetContractAddress, {
    holders: {
      start_after: startAfter,
      limit: lim,
    },
  });
  return reponse;
};

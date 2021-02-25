import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  address: string;
}
interface Holder {
  address: string;
  balance: string;
  index: string;
  pending_rewards: string;
}

export const queryRewardHolder = ({ lcd, bAsset, address }: Option) => async (
  addressProvider: AddressProvider,
): Promise<Holder> => {
  const bAssetContractAddress = addressProvider.blunaReward(bAsset);
  let reponse: Holder = await lcd.wasm.contractQuery(bAssetContractAddress, {
    holder: {
      address: address,
    },
  });
  return reponse;
};

import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
}
interface ConfigResponse {
  hub_contract: string;
  reward_denom: string;
}

export const queryRewardConfig = ({ lcd, bAsset }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const bAssetContractAddress = addressProvider.bAssetReward(bAsset);
  let reponse: ConfigResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      config: {},
    },
  );
  return reponse;
};

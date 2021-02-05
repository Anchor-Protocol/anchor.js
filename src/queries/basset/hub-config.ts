import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
}
interface ConfigResponse {
  owner: string;
  reward_contract?: string;
  token_contract?: string;
}

export const queryHubConfig = ({ lcd, bAsset }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
  let reponse: ConfigResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      config: {},
    },
  );
  return reponse;
};

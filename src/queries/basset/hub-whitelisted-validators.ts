import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
}
interface WhitelistedValResponse {
  validators: object[];
}

export const queryHubWhiteVals = ({ lcd, bAsset }: Option) => async (
  addressProvider: AddressProvider,
): Promise<WhitelistedValResponse> => {
  const bAssetContractAddress = addressProvider.blunaHub(bAsset);
  let reponse: WhitelistedValResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      whitelisted_validators: {},
    },
  );
  return reponse;
};

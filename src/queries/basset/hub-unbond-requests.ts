import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  address: string;
}
interface UnbondResponse {
  address: string;
  requestes: object[];
}

export const queryHubUnbond = ({ lcd, bAsset, address }: Option) => async (
  addressProvider: AddressProvider,
): Promise<UnbondResponse> => {
  const bAssetContractAddress = addressProvider.blunaHub(bAsset);
  let reponse: UnbondResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      unbond_requests: {
        address: address,
      },
    },
  );
  return reponse;
};

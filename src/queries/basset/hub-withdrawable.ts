import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  bAsset: string;
  address: string;
  block_time: number;
}

interface WithdrableResponse {
  withdrawable: string;
}

export const queryHubWithdrawable = ({
  lcd,
  bAsset,
  address,
  block_time,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<WithdrableResponse> => {
  const bAssetContractAddress = addressProvider.blunaHub(bAsset);
  let reponse: WithdrableResponse = await lcd.wasm.contractQuery(
    bAssetContractAddress,
    {
      withdrawable_unbonded: {
        address: address,
        block_time: +block_time,
      },
    },
  );
  return reponse;
};

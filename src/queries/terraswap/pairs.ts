import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface PairInfo {
  assetInfos: object[];
  contractAddr: string;
  liquidityToken: string;
}

export const queryPair = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<PairInfo> => {
  const pairContractAddress = addressProvider.terraswapblunaLunaPair();
  let reponse: PairInfo = await lcd.wasm.contractQuery(pairContractAddress, {
    pair: {},
  });
  return reponse;
};

import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface PoolResponse {
  assets: object[];
  total_share: string;
}

export const queryPool = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<PoolResponse> => {
  const pairContractAddress = addressProvider.blunaBurnPair();
  let reponse: PoolResponse = await lcd.wasm.contractQuery(
    pairContractAddress,
    {
      pool: {},
    },
  );
  return reponse;
};

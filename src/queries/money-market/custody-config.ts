import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  custody: string;
}
interface ConfigResponse {
  collateralToken: string;
  overseerContract: string;
  marketContract: string;
  rewardContract: string;
  liquidationContract: string;
  stableDenom: string;
}

export const queryCustodyConfig = ({ lcd, custody }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const custodyContractAddress = addressProvider.custody(custody);
  let response: ConfigResponse = await lcd.wasm.contractQuery(
    custodyContractAddress,
    {
      config: {},
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: string;
}
interface ConfigResponse {
  ownerAddr: string;
  oracleContract: string;
  marketContract: string;
  liquidationContract: string;
  distributionThreshold: string;
  targetDepositRate: string;
  bufferDistributionRate: string;
  stableDenom: string;
  epochPeriod: number;
  priceTimeframe: number;
}

export const queryOverseerConfig = ({ lcd, overseer }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const overseerContractAddress = addressProvider.overseer(overseer);
  let response: ConfigResponse = await lcd.wasm.contractQuery(
    overseerContractAddress,
    {
      config: {},
    },
  );
  return response;
};

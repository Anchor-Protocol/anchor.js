import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  oracleContract: string;
  stableDenom: string;
  safeRatio: string;
  bidFee: string;
  maxPremiumRate: string;
  liquidationThreshold: string;
  priceTimeframe: number;
}

export const queryLiquidationConfig = ({ lcd }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const liquidationContractAddress = addressProvider.liquidation();
  let response: ConfigResponse = await lcd.wasm.contractQuery(
    liquidationContractAddress,
    {
      config: {},
    },
  );
  return response;
};

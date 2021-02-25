import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
}

interface BAssetInfo {
  name: string;
  symbol: string;
  decimals: number;
}

interface ConfigResponse {
  owner: string;
  collateralToken: string;
  overseerContract: string;
  marketContract: string;
  rewardContract: string;
  liquidationContract: string;
  stableDenom: string;
  bassetInfo: BAssetInfo;
}

export const queryMarketConfig = ({ lcd, market }: Option) => async (
  addressProvider: AddressProvider,
): Promise<ConfigResponse> => {
  const marketContractAddress = addressProvider.market(market);
  let response: ConfigResponse = await lcd.wasm.contractQuery(
    marketContractAddress,
    {
      config: {},
    },
  );
  return response;
};

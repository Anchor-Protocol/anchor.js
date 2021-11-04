import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
  collateral: COLLATERAL_DENOMS;
}
interface ConfigResponse {
  owner: string;
  collateral_token: string;
  overseer_contract: string;
  market_contract: string;
  reward_contract: string;
  liquidation_contract: string;
  stable_denom: string;
  basset_info: BAssetInfo;
}

interface BAssetInfo {
  name: string;
  symbol: string;
  decimals: string;
}

export const queryCustodyConfig =
  ({ lcd, market, collateral }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const custodyContractAddress = addressProvider.custody(market, collateral);
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      custodyContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

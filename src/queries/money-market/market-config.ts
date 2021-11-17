import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
}

interface ConfigResponse {
  owner_addr: string;
  aterra_contract: string;
  interest_model: string;
  distribution_model: string;
  overseer_contract: string;
  collector_contract: string;
  distributor_contract: string;
  stable_denom: string;
  reserve_factor: string;
  max_borrow_factor: string;
}

export const queryMarketConfig =
  ({ lcd, market }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const marketContractAddress = addressProvider.market(market);
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      marketContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

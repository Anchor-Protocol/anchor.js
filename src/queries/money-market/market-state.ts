import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
  block_height: number;
}
interface StateResponse {
  total_liabilites: string;
  total_reserves: string;
  last_interest_updated: number;
  last_reward_updated: string;
  global_interest_index: string;
  global_reward_index: string;
  anc_emission_rate: string;
}

export const queryMarketState =
  ({ lcd, market, block_height }: Option) =>
  async (addressProvider: AddressProvider): Promise<StateResponse> => {
    const marketContractAddress = addressProvider.market(market);
    const response: StateResponse = await lcd.wasm.contractQuery(
      marketContractAddress,
      {
        state: {
          block_height: block_height,
        },
      },
    );
    return response;
  };

import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
}
interface EpochStateResponse {
  deposit_rate: string;
  prev_aterra_supply: string;
  prev_exchange_rate: string;
  last_executed_height: number;
}

export const queryOverseerEpochState =
  ({ lcd, market }: Option) =>
  async (addressProvider: AddressProvider): Promise<EpochStateResponse> => {
    const overseerContractAddress = addressProvider.overseer(market);
    const response: EpochStateResponse = await lcd.wasm.contractQuery(
      overseerContractAddress,
      {
        epoch_state: {},
      },
    );
    return response;
  };

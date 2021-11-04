import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: MARKET_DENOMS;
}
interface ConfigResponse {
  ownerAddr: string;
  oracle_contract: string;
  market_contract: string;
  collector_contract: string;
  liquidation_contract: string;
  threshold_deposit_rate: string;
  distribution_threshold_rate: string;
  target_deposit_rate: string;
  buffer_distribution_factor: string;
  stable_denom: string;
  epoch_period: number;
  price_timeframe: number;
}

export const queryOverseerConfig =
  ({ lcd, overseer }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      overseerContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

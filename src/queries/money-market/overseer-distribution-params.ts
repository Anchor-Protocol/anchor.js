import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: MARKET_DENOMS;
}
interface DistributionParamsResponse {
  deposit_rate: string;
  target_deposit_rate: string;
  distribution_threshold_rate: string;
}

export const queryOverseerDistributionParams =
  ({ lcd, overseer }: Option) =>
  async (
    addressProvider: AddressProvider,
  ): Promise<DistributionParamsResponse> => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    const response: DistributionParamsResponse = await lcd.wasm.contractQuery(
      overseerContractAddress,
      {
        distribution_params: {},
      },
    );
    return response;
  };

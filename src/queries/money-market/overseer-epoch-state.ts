import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: string;
}
interface EpochStateResponse {
  depositRate: string;
  prevATerraSupply: string;
  prevExchangeRate: string;
  lastExecutedHeight: number;
}

export const queryOverseerEpochState = ({ lcd, overseer }: Option) => async (
  addressProvider: AddressProvider,
): Promise<EpochStateResponse> => {
  const overseerContractAddress = addressProvider.overseer(overseer);
  let response: EpochStateResponse = await lcd.wasm.contractQuery(
    overseerContractAddress,
    {
      epoch_state: {},
    },
  );
  return response;
};

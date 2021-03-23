import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: string;
  block_height?: number;
}
interface EpochStateResponse {
  exchange_rate: string;
  aterra_supply: string;
}

export const queryMarketEpochState = ({
  lcd,
  market,
  block_height,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<EpochStateResponse> => {
  const marketContractAddress = addressProvider.market(market);
  const response: EpochStateResponse = await lcd.wasm.contractQuery(
    marketContractAddress,
    {
      epoch_state: {
        block_height: block_height,
      },
    },
  );
  return response;
};

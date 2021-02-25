import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: string;
}
interface DistributionParamsResponse {
  depositRate: string;
  targetDepositRate: string;
  distributionThresholdRate: string;
}

export const queryOverseerDistributionParams = ({
  lcd,
  overseer,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<DistributionParamsResponse> => {
  const overseerContractAddress = addressProvider.overseer(overseer);
  let response: DistributionParamsResponse = await lcd.wasm.contractQuery(
    overseerContractAddress,
    {
      distribution_params: {},
    },
  );
  return response;
};

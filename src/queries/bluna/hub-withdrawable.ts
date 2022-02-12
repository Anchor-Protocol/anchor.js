import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  address: string;
  block_time: number;
}

interface WithdrableResponse {
  withdrawable: string;
}

export const queryHubWithdrawable =
  ({ lcd, address, block_time }: Option) =>
  async (addressProvider: AddressProvider): Promise<WithdrableResponse> => {
    const bAssetContractAddress = addressProvider.bLunaHub();
    const response: WithdrableResponse = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        withdrawable_unbonded: {
          address: address,
          block_time: +block_time,
        },
      },
    );
    return response;
  };

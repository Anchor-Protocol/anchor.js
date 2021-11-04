import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
}
export interface Holder {
  address: string;
  balance: string;
  index: string;
  pending_rewards: string;
}

export const queryRewardHolder =
  ({ lcd, address }: Option) =>
  async (addressProvider: AddressProvider): Promise<Holder> => {
    const bAssetContractAddress = addressProvider.bLunaReward();
    const response: Holder = await lcd.wasm.contractQuery(
      bAssetContractAddress,
      {
        holder: {
          address: address,
        },
      },
    );
    return response;
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
}
interface AccruedReward {
  rewards: string;
}

export const querybEthRewardAccrued =
  ({ lcd, address }: Option) =>
  async (addressProvider: AddressProvider): Promise<AccruedReward> => {
    const bAssetContractAddress = addressProvider.bEthReward();
    return lcd.wasm.contractQuery(bAssetContractAddress, {
      accrued_rewards: {
        address: address,
      },
    });
  };

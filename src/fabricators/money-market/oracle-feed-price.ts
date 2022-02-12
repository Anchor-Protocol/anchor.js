import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

export type Pair = [string, string];

interface Option {
  address: string;
  prices: Pair[];
}

export const fabricateOracleFeedPrice =
  ({ address, prices }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const mmOracle = addressProvider.oracle();

    return [
      new MsgExecuteContract(address, mmOracle, {
        feed_price: {
          prices: prices,
        },
      }),
    ];
  };

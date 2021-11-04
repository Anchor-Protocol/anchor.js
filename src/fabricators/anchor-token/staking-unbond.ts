import { MsgExecuteContract, Int, Dec } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  amount: string;
}

export const fabricateStakingUnbond =
  ({ address, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const staking = addressProvider.staking();

    return [
      new MsgExecuteContract(address, staking, {
        unbond: {
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

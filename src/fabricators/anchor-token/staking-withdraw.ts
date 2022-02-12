import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
}

export const fabricateStakingWithdraw =
  ({ address }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const staking = addressProvider.staking();

    return [
      new MsgExecuteContract(address, staking, {
        withdraw: {},
      }),
    ];
  };

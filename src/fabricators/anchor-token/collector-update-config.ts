import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { validateIsNumber } from '../../utils/validation/number';
import { validateTrue } from '../../utils/validation/true';

interface Option {
  address: string;
  reward_factor?: string;
}

export const fabricateCollectorUpdateConfig =
  ({ address, reward_factor }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      reward_factor ? validateIsNumber(reward_factor) : validateTrue,
    ]);

    const collector = addressProvider.collector();

    return [
      new MsgExecuteContract(address, collector, {
        update_config: {
          reward_factor,
        },
      }),
    ];
  };

import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  reward_weight?: string;
}

export const fabricateCollectorConfig = ({
  address,
  reward_weight,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([validateAddress(address)]);

  const collector = addressProvider.collector();

  return [
    new MsgExecuteContract(address, collector, {
      update_config: {
        reward_weight,
      },
    }),
  ];
};

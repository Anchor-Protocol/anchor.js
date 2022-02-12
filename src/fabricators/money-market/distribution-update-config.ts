import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  owner: string;
  emission_cap?: string;
  emission_floor?: string;
  increment_multiplier?: string;
  decrement_multiplier?: string;
}

export const fabricateDistributionUpdateConfig =
  ({
    address,
    owner,
    emission_cap,
    emission_floor,
    increment_multiplier,
    decrement_multiplier,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner ? validateAddress(owner) : validateTrue,
    ]);

    const mmInterest = addressProvider.interest();

    return [
      new MsgExecuteContract(address, mmInterest, {
        update_config: {
          owner,
          emission_cap,
          emission_floor,
          increment_multiplier,
          decrement_multiplier,
        },
      }),
    ];
  };

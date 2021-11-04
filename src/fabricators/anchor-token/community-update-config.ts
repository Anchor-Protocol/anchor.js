import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { validateIsNumber } from '../../utils/validation/number';
import { validateTrue } from '../../utils/validation/true';

interface Option {
  address: string;
  spend_limit?: string;
}

export const fabricateCommunityUpdateConfig =
  ({ address, spend_limit }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      spend_limit ? validateIsNumber(spend_limit) : validateTrue,
    ]);

    const community = addressProvider.community();

    return [
      new MsgExecuteContract(address, community, {
        update_config: {
          spend_limit,
        },
      }),
    ];
  };

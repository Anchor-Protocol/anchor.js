import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  spend_limit?: string;
}

export const fabricateCommunityConfig = ({ address, spend_limit }: Option) => (
  addressProvider: AddressProvider,
): MsgExecuteContract[] => {
  validateInput([validateAddress(address)]);

  const community = addressProvider.community();

  return [
    new MsgExecuteContract(address, community, {
      update_config: {
        spend_limit,
      },
    }),
  ];
};

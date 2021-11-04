import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param Client’s Terra address (address of the new owner).
 */

interface Option {
  address: string;
  owner?: string;
}

export const fabricatebEthUpdateConfig =
  ({ address, owner }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const bEthRewardAddress = addressProvider.bEthReward();

    return [
      new MsgExecuteContract(address, bEthRewardAddress, {
        update_config: {
          owner,
        },
      }),
    ];
  };

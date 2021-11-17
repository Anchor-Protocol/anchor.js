import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  recipient?: string;
}

export const fabricatebEthClaimRewards =
  ({ address, recipient }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const bEthRewardAddress = addressProvider.bEthReward();

    return [
      new MsgExecuteContract(address, bEthRewardAddress, {
        claim_rewards: {
          recipient,
        },
      }),
    ];
  };

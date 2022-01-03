import { BAssetAddressProvider } from '../../address-provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param collateral to calculate the rewards on.
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  recipient?: string;
}

export const fabricatebAssetClaimRewards =
  ({ address, recipient }: Option) =>
  (addressProvider: BAssetAddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);
    return [
      new MsgExecuteContract(address, addressProvider.reward(), {
        claim_rewards: {
          recipient,
        },
      }),
    ];
  };

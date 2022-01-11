import { BAssetAddressProvider, AddressProvider } from '../../address-provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param bAsset to calculate the rewards on.
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  recipient?: string;
}

export const fabricatebAssetClaimRewards =
  ({ address, bAsset, recipient }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);
    return [
      new MsgExecuteContract(address, bAsset.reward(), {
        claim_rewards: {
          recipient,
        },
      }),
    ];
  };

import {
  AddressProvider,
  COLLATERAL_DENOMS,
} from '../../address-provider/provider';
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
  collateral: COLLATERAL_DENOMS;
  recipient?: string;
}

export const fabricatebAssetClaimRewards =
  ({ address, collateral, recipient }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const bAssetRewardAddress = addressProvider.bAssetReward(collateral);

    return [
      new MsgExecuteContract(address, bAssetRewardAddress, {
        claim_rewards: {
          recipient,
        },
      }),
    ];
  };

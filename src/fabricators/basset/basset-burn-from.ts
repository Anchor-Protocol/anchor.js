import {
  AddressProvider,
  COLLATERAL_DENOMS,
} from '../../address-provider/provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param collateral to burn.
 * @param amount of burn.
 * @param owner Client's Terra address (address of allowance owner).
 */

interface Option {
  address: string;
  collateral: COLLATERAL_DENOMS;
  amount: string;
  owner: string;
}

export const fabricatebAssetBurnFrom =
  ({ address, collateral, amount, owner }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(owner),
    ]);

    const bAssetTokenAddress = addressProvider.bAssetToken(collateral);

    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_token/src/handler.rs#L179
        burn_from: {
          owner: owner,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

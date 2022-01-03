import { BAssetAddressProvider } from '../../address-provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

/* eslint-disable */
type Expire = { at_height: number } | { at_time: number } | { never: {} };

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param collateral asset to decrease.
 * @param amount of allowance.
 * @param spends Client's Terra address (address of spender).
 * @param expire, at specific height e.g. {"at_height": 3_500_000}, at specific time {"at_time": 1624421015 }, or never
 */

interface Option {
  address: string;
  amount: string;
  spender: string;
  expires?: Expire;
}

export const fabricatebAssetDecreaseAllowance =
  ({ address, amount, spender, expires }: Option) =>
  (addressProvider: BAssetAddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(spender),
    ]);
    return [
      new MsgExecuteContract(address, addressProvider.token(), {
        // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_reward/src/user.rs#L16
        decrease_allowance: {
          spender: spender,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          expires: expires,
        },
      }),
    ];
  };

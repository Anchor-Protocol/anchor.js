import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';
import { Expire } from '../types';

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  amount: string;
  spender: string;
  expires?: Expire;
}

export const fabricatebAssetIncreaseAllowance =
  ({ address, bAsset, amount, spender, expires }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(spender),
    ]);
    return [
      new MsgExecuteContract(address, bAsset.token(), {
        // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_token/src/contract.rs#L57
        increase_allowance: {
          spender: spender,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          expires: expires,
        },
      }),
    ];
  };

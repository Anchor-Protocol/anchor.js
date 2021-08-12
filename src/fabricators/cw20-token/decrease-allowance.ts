import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

/* eslint-disable */
type Expire = { at_height: number } | { at_time: number } | { never: {} };

interface Option {
  address: string;
  amount: string;
  contract_address: string;
  spender: string;
  expires?: Expire;
}

export const fabricateCw20DecreaseAllowance = ({
  address,
  amount,
  contract_address,
  spender,
  expires,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(spender),
  ]);

  return [
    new MsgExecuteContract(address, contract_address, {
      // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_token/src/contract.rs#L57
      decrease_allowance: {
        spender: spender,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        expires: expires,
      },
    }),
  ];
};

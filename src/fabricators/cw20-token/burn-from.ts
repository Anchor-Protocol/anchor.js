import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

interface Option {
  address: string;
  contract_address: string;
  amount: string;
  owner: string;
}

export const fabricateCw20BurnFrom = ({
  address,
  contract_address,
  amount,
  owner,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(owner),
  ]);

  return [
    new MsgExecuteContract(address, contract_address, {
      burn_from: {
        owner: owner,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

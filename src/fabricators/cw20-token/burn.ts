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
}

export const fabricateCw20Burn = ({
  address,
  contract_address,
  amount,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
  ]);

  return [
    new MsgExecuteContract(address, contract_address, {
      burn: {
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

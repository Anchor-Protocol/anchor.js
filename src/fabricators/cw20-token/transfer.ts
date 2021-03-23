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
  recipient: string;
}

export const fabricateCw20Transfer = ({
  address,
  contract_address,
  amount,
  recipient,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(recipient),
  ]);

  return [
    new MsgExecuteContract(address, contract_address, {
      transfer: {
        recipient: recipient,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

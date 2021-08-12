import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

interface Option {
  address: string;
  amount: string;
  contract_address: string;
  owner: string;
  recipient: string;
}

export const fabricateCw20TransferFrom = ({
  address,
  amount,
  contract_address,
  owner,
  recipient,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(owner),
    validateAddress(recipient),
  ]);

  return [
    new MsgExecuteContract(address, contract_address, {
      transfer_from: {
        owner: owner,
        recipient: recipient,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

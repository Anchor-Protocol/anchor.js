import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  contractAddress: string;
  amount: string;
  recipient: string;
}

export const fabricateCw20Transfer = ({
  address,
  contractAddress,
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
    new MsgExecuteContract(address, contractAddress, {
      transfer: {
        recipient: recipient,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

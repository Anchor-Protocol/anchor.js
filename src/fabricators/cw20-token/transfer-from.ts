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
  amount: string;
  contractAddress: string;
  owner: string;
  recipient: string;
}

export const fabricateCw20TransferFrom = ({
  address,
  amount,
  contractAddress,
  owner,
  recipient,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(+amount),
    validateIsGreaterThanZero(+amount),
    validateAddress(owner),
    validateAddress(recipient),
  ]);

  return [
    new MsgExecuteContract(address, contractAddress, {
      transfer_from: {
        owner: owner,
        recipient: recipient,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

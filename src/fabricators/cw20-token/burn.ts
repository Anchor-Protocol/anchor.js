import { AddressProvider } from '../../address-provider/provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

interface Option {
  address: string;
  contractAddress: string;
  amount: string;
}

export const fabricateCw20Burn = ({
  address,
  contractAddress,
  amount,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(+amount),
    validateIsGreaterThanZero(+amount),
  ]);

  return [
    new MsgExecuteContract(address, contractAddress, {
      burn: {
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
      },
    }),
  ];
};

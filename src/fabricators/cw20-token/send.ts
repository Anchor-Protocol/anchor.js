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
  contract: string;
  msg?: string;
}

export const fabricateCw20Send = ({
  address,
  contractAddress,
  amount,
  contract,
  msg,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(+amount),
    validateIsGreaterThanZero(+amount),
    validateAddress(contract),
  ]);

  let message = undefined;
  if (msg) {
    message = Buffer.from(JSON.stringify(msg)).toString('base64');
  }

  return [
    new MsgExecuteContract(address, contractAddress, {
      send: {
        contract: contract,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        msg: message,
      },
    }),
  ];
};

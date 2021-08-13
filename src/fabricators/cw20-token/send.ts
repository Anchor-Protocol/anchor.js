import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

/* eslint-disable */
interface Option {
  address: string;
  contract_address: string;
  amount: string;
  contract: string;
  msg?: object;
}

export const fabricateCw20Send = ({
  address,
  contract_address,
  amount,
  contract,
  msg,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(contract),
  ]);

  let message = undefined;
  if (msg) {
    message = Buffer.from(JSON.stringify(msg)).toString('base64');
  }

  return [
    new MsgExecuteContract(address, contract_address, {
      send: {
        contract: contract,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        msg: message,
      },
    }),
  ];
};

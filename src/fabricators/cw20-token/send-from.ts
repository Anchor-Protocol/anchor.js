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
  owner: string;
  contract: string;
  msg?: object;
}

export const fabricateCw20SendFrom = ({
  address,
  contract_address,
  amount,
  contract,
  owner,
  msg,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
    validateAddress(owner),
    validateAddress(contract),
  ]);

  let message = undefined;
  if (msg) {
    message = Buffer.from(JSON.stringify(msg)).toString('base64');
  }

  return [
    new MsgExecuteContract(address, contract_address, {
      send_from: {
        owner: owner,
        contract: contract,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        msg: message,
      },
    }),
  ];
};

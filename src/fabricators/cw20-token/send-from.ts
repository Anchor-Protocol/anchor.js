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
  owner: string;
  contract: string;
  msg?: string;
}

export const fabricateCw20SendFrom = ({
  address,
  contractAddress,
  amount,
  contract,
  owner,
  msg,
}: Option): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(+amount),
    validateIsGreaterThanZero(+amount),
    validateAddress(owner),
    validateAddress(contract),
  ]);

  let message = undefined;
  if (msg) {
    message = Buffer.from(JSON.stringify(msg)).toString('base64');
  }

  return [
    new MsgExecuteContract(address, contractAddress, {
      send_from: {
        owner: owner,
        contract: contract,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        msg: message,
      },
    }),
  ];
};

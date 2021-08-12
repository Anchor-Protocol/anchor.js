import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';

/* eslint-disable */
interface Option {
  address: string;
  amount: string;
  contract: string;
  msg?: object;
}

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param amount to send.
 * @param contract Client's Terra address (address of contract that receives the amount).
 * @param msg, message of receiver contract.
 */
export const fabricatebEthSend =
  ({ address, amount, contract, msg }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(contract),
    ]);

    const bEthTokenAddress = addressProvider.bEthToken();
    let message = undefined;
    if (msg) {
      message = Buffer.from(JSON.stringify(msg)).toString('base64');
    }

    return [
      new MsgExecuteContract(address, bEthTokenAddress, {
        send: {
          contract: contract,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: message,
        },
      }),
    ];
  };

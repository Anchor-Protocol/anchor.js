import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param amount to send.
 * @param recipient Client's Terra address (address of recipient).
 * @param owner Client;s terra address (owner of the allowance).
 */

interface Option {
  address: string;
  amount: string;
  owner: string;
  recipient: string;
}

export const fabricatebEthTransferFrom =
  ({ address, amount, owner, recipient }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(owner),
      validateAddress(recipient),
    ]);

    const bEthTokenAddress = addressProvider.bEthToken();

    return [
      new MsgExecuteContract(address, bEthTokenAddress, {
        transfer_from: {
          owner: owner,
          recipient: recipient,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

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
 */

interface Option {
  address: string;
  amount: string;
  recipient: string;
}

export const fabricatebEthTransfer =
  ({ address, amount, recipient }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(recipient),
    ]);

    const bAssetTokenAddress = addressProvider.bEthToken();

    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        transfer: {
          recipient: recipient,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

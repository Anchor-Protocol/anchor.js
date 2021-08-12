import { AddressProvider } from '../../address-provider/provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param amount of burn.
 * @param owner Client's Terra address (address of allowance owner).
 */

interface Option {
  address: string;
  amount: string;
  owner: string;
}

export const fabricatebEthBurnFrom =
  ({ address, amount, owner }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(owner),
    ]);

    const bEthTokenAddress = addressProvider.bEthToken();

    return [
      new MsgExecuteContract(address, bEthTokenAddress, {
        burn_from: {
          owner: owner,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

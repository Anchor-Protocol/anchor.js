import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider';

interface Option {
  address: string;
  amount: string;
}

export const fabricatebAssetBurn =
  ({ address, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);

    const bAssetTokenAddress = addressProvider.bLunaToken();
    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        burn: {
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

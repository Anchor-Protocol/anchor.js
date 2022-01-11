import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param bAsset to burn.
 * @param amount of burn.
 */

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  amount: string;
}

export const fabricatebAssetBurn =
  ({ address, bAsset, amount }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);
    return [
      new MsgExecuteContract(address, bAsset.token(), {
        burn: {
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

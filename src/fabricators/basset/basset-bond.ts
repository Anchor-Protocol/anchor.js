import { AddressProvider } from '../../address-provider/provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import {
  validateAddress,
  validateValAddress,
} from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';

interface Option {
  address: string;
  amount: string;
  validator: string; // validator address
}

export const fabricatebAssetBond =
  ({ address, amount, validator }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateValAddress(validator),
      validateIsGreaterThanZero(amount),
    ]);

    const bAssetContractAddress = addressProvider.bLunaHub();

    return [
      new MsgExecuteContract(
        address,
        bAssetContractAddress,
        {
          bond: {
            validator, // validator must be whitelisted
          },
        },

        // send native token
        {
          uluna: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      ),
    ];
  };

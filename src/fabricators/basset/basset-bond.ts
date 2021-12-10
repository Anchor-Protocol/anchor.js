import { AddressProvider } from '../../address-provider/provider';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';

interface Option {
  address: string;
  amount: string;
}

export const fabricatebAssetBond =
  ({ address, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    const bAssetContractAddress = addressProvider.bLunaHub();

    return [
      new MsgExecuteContract(
        address,
        bAssetContractAddress,
        {
          bond: {},
        },

        // send native token
        {
          uluna: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      ),
    ];
  };

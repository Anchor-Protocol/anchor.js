import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { validateTrue } from '../../utils/validation/true';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { AddressProvider, BAssetAddressProvider } from '../../address-provider';
import { isAmountSet } from '../../utils/validation/amount';

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  amount?: string;
}

export const fabricateCustodyWithdrawCollateral =
  ({ address, bAsset, amount = undefined }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      amount ? validateIsGreaterThanZero(amount) : validateTrue,
    ]);
    return [
      new MsgExecuteContract(address, bAsset.custody(), {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/custody/src/msg.rs#L69
        withdraw_collateral: {
          amount: isAmountSet(amount)
            ? new Int(new Dec(amount).mul(1000000)).toString()
            : undefined,
        },
      }),
    ];
  };

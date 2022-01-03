import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { BAssetAddressProvider } from '../../address-provider';

interface Option {
  address: string;
  amount: string;
  owner: string;
  recipient: string;
}

export const fabricatebAssetTransferFrom =
  ({ address, amount, owner, recipient }: Option) =>
  (addressProvider: BAssetAddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(owner),
      validateAddress(recipient),
    ]);
    return [
      new MsgExecuteContract(address, addressProvider.token(), {
        // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_token/src/handler.rs#L142
        transfer_from: {
          owner: owner,
          recipient: recipient,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

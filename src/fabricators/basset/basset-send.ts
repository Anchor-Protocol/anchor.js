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

export const fabricatebAssetSend =
  ({ address, amount, contract, msg }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
      validateAddress(contract),
    ]);

    const bAssetTokenAddress = addressProvider.bLunaToken();
    let message = undefined;
    if (msg) {
      message = Buffer.from(JSON.stringify(msg)).toString('base64');
    }

    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_token/src/handler.rs#L17
        send: {
          contract: contract,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: message,
        },
      }),
    ];
  };

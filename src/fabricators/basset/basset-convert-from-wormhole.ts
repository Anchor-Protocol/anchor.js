import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { BAssetAddressProvider } from '../../address-provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param collateral to convert.
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  amount: string;
}

export const fabricatebAssetConvertFromWormhole =
  ({ address, amount }: Option) =>
  (addressProvider: BAssetAddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);
    return [
      new MsgExecuteContract(address, addressProvider.token(), {
        send: {
          contract: addressProvider.converter(),
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            convertWormholeToAnchor: {},
          }),
        },
      }),
    ];
  };

import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param asset to convert.
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  amount: string;
}

export const fabricatebAssetConvertAnchorToWormhole =
  ({ address, bAsset, amount }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);
    return [
      new MsgExecuteContract(address, bAsset.token(), {
        send: {
          contract: bAsset.converter(),
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            convert_anchor_to_wormhole: {},
          }),
        },
      }),
    ];
  };

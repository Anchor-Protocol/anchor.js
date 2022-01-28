import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param bAsset to convert.
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  amount: string;
  wormholeTokenDecimals: number;
}

export const fabricatebAssetConvertWormholeToAnchor =
  ({ address, bAsset, amount, wormholeTokenDecimals }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);
    return [
      new MsgExecuteContract(address, bAsset.token(), {
        send: {
          contract: bAsset.converter(),
          amount: new Int(
            new Dec(amount).mul(Math.pow(10, wormholeTokenDecimals)),
          ).toString(),
          msg: createHookMsg({
            convert_wormhole_to_anchor: {},
          }),
        },
      }),
    ];
  };

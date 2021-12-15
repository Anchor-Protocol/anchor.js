import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
} from '../../address-provider/provider';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param collateral to convert.
 * @param Client’s Terra address (address of reward recipient).
 */

interface Option {
  address: string;
  collateral: COLLATERAL_DENOMS;
  amount: string;
}

export const fabricatebAssetConvertToWormhole =
  ({ address, collateral, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    const bAssetTokenAddress = addressProvider.bAssetToken(collateral);
    const bAssetConverterAddress = addressProvider.bAssetConverter(collateral);

    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        send: {
          contract: bAssetConverterAddress,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            convertAnchorToWormhole: {},
          }),
        },
      }),
    ];
  };

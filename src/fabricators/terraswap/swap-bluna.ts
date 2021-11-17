import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  amount: string;
  to?: string;
  belief_price?: string;
  max_spread?: string;
}

export const fabricateTerraswapSwapbLuna =
  ({ address, amount, to, belief_price, max_spread }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);

    const bAssetTokenAddress = addressProvider.bLunaToken();
    const pairAddress = addressProvider.terraswapblunaLunaPair();

    return [
      new MsgExecuteContract(address, bAssetTokenAddress, {
        send: {
          contract: pairAddress,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            swap: {
              belief_price: belief_price,
              max_spread: max_spread,
              to: to,
            },
          }),
        },
      }),
    ];
  };

import {
  Coin,
  Coins,
  Dec,
  Int,
  MsgExecuteContract,
} from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  amount: string;
  denom: string;
  to?: string;
  belief_price?: string;
  max_spread?: string;
}

export const fabricateTerraswapSwapLuna =
  ({ address, amount, to, belief_price, max_spread, denom }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);
    const coins = new Coins([
      new Coin(denom, new Int(new Dec(amount).mul(1000000)).toString()),
    ]);
    const pairAddress = addressProvider.terraswapblunaLunaPair();
    return [
      new MsgExecuteContract(
        address,
        pairAddress,
        {
          swap: {
            offer_asset: {
              info: {
                native_token: {
                  denom: denom,
                },
              },
              amount: new Int(new Dec(amount).mul(1000000)).toString(),
            },
            belief_price: belief_price,
            max_spread: max_spread,
            to: to,
          },
        },
        coins,
      ),
    ];
  };

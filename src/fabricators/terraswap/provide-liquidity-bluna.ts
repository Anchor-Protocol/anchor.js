import {
  Coin,
  Dec,
  Coins,
  Int,
  MsgExecuteContract,
} from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { validateIsGreaterThanZero } from '../../utils/validation/number';

/* eslint-disable */
type Expire = { at_height: number } | { at_time: number } | { never: {} };

interface Option {
  address: string;
  token_amount: string;
  native_amount: string;
  quote: string;
  slippage_tolerance?: string;
  expires: Expire;
}

export const fabricateTerraswapProvideLiquiditybLuna =
  ({
    address,
    slippage_tolerance,
    token_amount,
    native_amount,
    quote,
    expires,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(token_amount),
      validateIsGreaterThanZero(native_amount),
    ]);

    const pairAddress = addressProvider.terraswapblunaLunaPair();
    const tokenAddress = addressProvider.bLunaToken();

    const coins = new Coins([
      new Coin(quote, new Int(new Dec(native_amount).mul(1000000)).toString()),
    ]);
    return [
      new MsgExecuteContract(address, tokenAddress, {
        increase_allowance: {
          spender: pairAddress,
          amount: new Int(new Dec(token_amount).mul(1000000)).toString(),
          expires: expires || { never: {} },
        },
      }),
      new MsgExecuteContract(
        address,
        pairAddress,
        {
          provide_liquidity: {
            assets: [
              {
                info: {
                  token: {
                    contract_addr: tokenAddress,
                  },
                },
                amount: new Int(new Dec(token_amount).mul(1000000)).toString(),
              },
              {
                info: {
                  native_token: {
                    denom: quote,
                  },
                },
                amount: new Int(new Dec(native_amount).mul(1000000)).toString(),
              },
            ],
            slippage_tolerance: slippage_tolerance
              ? slippage_tolerance
              : undefined,
          },
        },
        coins,
      ),
    ];
  };

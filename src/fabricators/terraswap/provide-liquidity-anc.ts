import {
  Coin,
  Dec,
  Coins,
  Int,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { validateInput } from "../../utils/validate-input";
import { validateAddress } from "../../utils/validation/address";
import { AddressProvider } from "../../address-provider/provider";
import { validateIsGreaterThanZero } from "../../utils/validation/number";

type Expire = { at_height: number } | { at_time: number } | { never: {} };

interface Option {
  address: string;
  tokenAmount: string;
  nativeAmount: string;
  quote: string;
  slippageTolerance?: string;
  expires?: Expire;
}

export const fabricateTerraSwapProvideLiquidityANC = ({
  address,
  slippageTolerance,
  tokenAmount,
  nativeAmount,
  quote,
  expires,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsGreaterThanZero(tokenAmount),
    validateIsGreaterThanZero(nativeAmount),
  ]);

  const pairAddress = addressProvider.terraswapAncUstPair();
  const tokenAddress = addressProvider.ANC();

  const coins = new Coins([
    new Coin(quote, new Int(new Dec(nativeAmount).mul(1000000)).toString()),
  ]);
  return [
    new MsgExecuteContract(address, tokenAddress, {
      increase_allowance: {
        spender: pairAddress,
        amount: new Int(new Dec(tokenAmount).mul(1000000)).toString(),
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
              amount: new Int(new Dec(tokenAmount).mul(1000000)).toString(),
            },
            {
              info: {
                native_token: {
                  denom: quote,
                },
              },
              amount: new Int(new Dec(nativeAmount).mul(1000000)).toString(),
            },
          ],
          slippage_tolerance: slippageTolerance ? slippageTolerance : undefined,
        },
      },
      coins
    ),
  ];
};

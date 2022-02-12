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
}

export const fabricateExchangeWithdrawLiquidityANC =
  ({ address, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);

    const lpToken = addressProvider.ancUstLPToken();
    const pairAddress = addressProvider.ancUstPair();

    return [
      new MsgExecuteContract(address, lpToken, {
        send: {
          contract: pairAddress,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            withdraw_liquidity: {},
          }),
        },
      }),
    ];
  };

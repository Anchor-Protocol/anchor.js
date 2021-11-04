import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { AddressProvider } from '../../address-provider/provider';
import { MARKET_DENOMS } from '../../address-provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  amount: string;
}

/**
 * @param address Client’s Terra address.
 * @param symbol Symbol of stablecoin to redeem, or its aToken equivalent.
 * @param amount Amount of a stablecoin to redeem, or amount of an aToken (aTerra) to redeem (specified by market).
 */
export const fabricateMarketRedeemStable =
  ({ address, market, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    const marketAddress = addressProvider.market(market);
    const aTokenAddress = addressProvider.aTerra(market);

    return [
      new MsgExecuteContract(address, aTokenAddress, {
        send: {
          contract: marketAddress,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            redeem_stable: {},
          }),
        },
      }),
    ];
  };

import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { validateIsNumber } from '../../utils/validation/number';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';
import { MARKET_DENOMS } from '../../address-provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  amount: string;
  to?: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to borrow.
 * @param amount Amount of stablecoin to borrow.
 */
export const fabricateMarketBorrow =
  ({ address, market, amount, to }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsNumber(amount),
      validateIsGreaterThanZero(amount),
    ]);

    const mmContractAddress = addressProvider.market(market);

    return [
      new MsgExecuteContract(address, mmContractAddress, {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L68
        borrow_stable: {
          borrow_amount: new Int(new Dec(amount).mul(1000000)).toString(),
          to: to || undefined,
        },
      }),
    ];
  };

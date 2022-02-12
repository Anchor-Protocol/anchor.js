import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';
import { MARKET_DENOMS } from '../../address-provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  amount: string;
}

/**
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to repay.
 * @param borrower (optional) Terra address of the entity that created the loan position.If null, repays address‘s loan
 * @param amount (optional) Amount of stablecoin to repay. Set to null if repay_all is set to true.
 */

export const fabricateMarketRepay =
  ({ address, market, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    //const nativeTokenDenom = market;
    const mmContractAddress = addressProvider.market(market);

    return [
      new MsgExecuteContract(
        address,
        mmContractAddress,
        {
          // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L74
          repay_stable: {},
        },
        // sending stablecoin
        {
          [`${market}`]: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      ),
    ];
  };

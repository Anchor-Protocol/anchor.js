import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

import { validateIsGreaterThanZero } from '../../utils/validation/number';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  amount: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to deposit collateral. Currently only supports UST and KRT.
 //  * @param borrower (optional) — Terra address of the entity that created the loan position. If null, adds collateral to address‘s loan position.
 * @param amount Amount of collateral to deposit.
 */
export const fabricateOverseerLockCollateral =
  ({ address, market, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    const mmOverseerContract = addressProvider.overseer(market);
    const bAssetTokenContract = addressProvider.bLunaToken();

    return [
      // lock_collateral call
      new MsgExecuteContract(address, mmOverseerContract, {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L75
        lock_collateral: {
          collaterals: [
            [
              bAssetTokenContract,
              new Int(new Dec(amount).mul(1000000)).toString(),
            ],
          ],
        },
      }),
    ];
  };

import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import {
  AddressProvider,
  BAssetAddressProvider,
  MARKET_DENOMS,
} from '../../address-provider';

interface Option {
  address: string;
  collateral: BAssetAddressProvider;
  market: MARKET_DENOMS;
  amount: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to deposit collateral. Currently only supports UST.
 * @param amount Amount of collateral to deposit.
 */
export const fabricateOverseerLockbAssetCollateral =
  ({ address, collateral, market, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    const mmOverseerContract = addressProvider.overseer(market);

    return [
      // lock_collateral call
      new MsgExecuteContract(address, mmOverseerContract, {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L75
        lock_collateral: {
          collaterals: [
            [
              collateral.token(),
              new Int(new Dec(amount).mul(1000000)).toString(),
            ],
          ],
        },
      }),
    ];
  };

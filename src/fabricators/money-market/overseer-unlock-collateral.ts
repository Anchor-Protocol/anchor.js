import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';

import { validateWhitelistedMarket } from '../../utils/validation/market';
import { validateTrue } from '../../utils/validation/true';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { AddressProvider } from '../../address-provider/provider';
import { isAmountSet } from '../../utils/validation/amount';

interface Option {
  address: string;
  market: string;
  borrower?: string;
  amount?: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to redeem collateral.
 * @param symbol Symbol of collateral to redeem.
 * @param redeem_all Set this to true to redeem all symbol collateral deposited to loan_id.
 * @param amount (optional) Amount of collateral to redeem. Set this to null if redeem_all is true.
 * @param withdraw_to (optional) Terra address to withdraw redeemed collateral. If null, withdraws to address.
 */
export const fabricateOverseerUnlockCollateral = ({
  address,
  market,
  amount,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    amount ? validateIsGreaterThanZero(amount) : validateTrue,
  ]);

  const mmOverseerContract = addressProvider.overseer(market.toLowerCase());
  const bAssetTokenContract = addressProvider.bAssetToken('ubluna');

  return [
    // unlock collateral
    new MsgExecuteContract(address, mmOverseerContract, {
      // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L78
      unlock_collateral: {
        collaterals: [
          [
            bAssetTokenContract,
            isAmountSet(amount)
              ? new Int(new Dec(amount).mul(1000000)).toString()
              : undefined,
          ],
        ],
      },
    }),
  ];
};

import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';

import { validateTrue } from '../../utils/validation/true';
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
 * @param market Type of stablecoin money market to redeem collateral.
 * @param symbol Symbol of collateral to redeem.
 * @param amount Amount of collateral to redeem.
 */
export const fabricateOverseerUnlockBETHCollateral =
  ({ address, market, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      amount ? validateIsGreaterThanZero(amount) : validateTrue,
    ]);

    const mmOverseerContract = addressProvider.overseer(market);
    const bAssetTokenContract = addressProvider.bEthToken();

    return [
      // unlock collateral
      new MsgExecuteContract(address, mmOverseerContract, {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L78
        unlock_collateral: {
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

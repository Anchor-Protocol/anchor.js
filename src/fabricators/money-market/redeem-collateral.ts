import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';

import { validateTrue } from '../../utils/validation/true';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from '../../address-provider/provider';
import { isAmountSet } from '../../utils/validation/amount';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  collateral: COLLATERAL_DENOMS;
  amount?: string;
}

export const fabricateRedeemCollateral =
  ({ address, market, collateral, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      amount ? validateIsGreaterThanZero(amount) : validateTrue,
    ]);

    let bAssetTokenContract = addressProvider.bLunaToken();

    if (collateral == COLLATERAL_DENOMS.UBETH) {
      bAssetTokenContract = addressProvider.bEthToken();
    }

    const mmOverseerContract = addressProvider.overseer(market);
    const custodyContract = addressProvider.custody(market, collateral);

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

      // withdraw from custody
      new MsgExecuteContract(address, custodyContract, {
        // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/custody/src/msg.rs#L69
        withdraw_collateral: {
          amount: isAmountSet(amount)
            ? new Int(new Dec(amount).mul(1000000)).toString()
            : undefined,
        },
      }),
    ];
  };

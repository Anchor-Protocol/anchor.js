import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

import { validateIsGreaterThanZero } from '../../utils/validation/number';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  collateral: COLLATERAL_DENOMS;
  amount: string;
}

export const fabricateCustodyDepositCollateral =
  ({ address, market, collateral, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    let bAssetTokenContract = addressProvider.bLunaToken();

    if (collateral == COLLATERAL_DENOMS.UBETH) {
      bAssetTokenContract = addressProvider.bEthToken();
    }
    const custodyContract = addressProvider.custody(market, collateral);

    // cw20 send + provide_collateral hook
    return [
      // provide_collateral call
      new MsgExecuteContract(address, bAssetTokenContract, {
        send: {
          contract: custodyContract,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            deposit_collateral: {},
          }),
        },
      }),
    ];
  };

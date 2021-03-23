import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

import { validateIsGreaterThanZero } from '../../utils/validation/number';
import {
  AddressProvider,
  CUSTODY_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  custody: CUSTODY_DENOMS;
  amount: string;
}

export const fabricateCustodyDepositCollateral = ({
  address,
  custody,
  amount,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([validateAddress(address), validateIsGreaterThanZero(amount)]);

  const bAssetTokenContract = addressProvider.bLunaToken();
  const custodyContract = addressProvider.custody(custody);

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

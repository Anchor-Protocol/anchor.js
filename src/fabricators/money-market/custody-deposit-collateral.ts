import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsGreaterThanZero } from '../../utils/validation/number';
import { AddressProvider, BAssetAddressProvider } from '../../address-provider';

interface Option {
  address: string;
  collateral: BAssetAddressProvider;
  amount: string;
}

export const fabricateCustodyDepositCollateral =
  ({ address, collateral, amount }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateIsGreaterThanZero(amount),
    ]);

    // cw20 send + provide_collateral hook
    return [
      // provide_collateral call
      new MsgExecuteContract(address, collateral.token(), {
        send: {
          contract: collateral.custody(),
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            deposit_collateral: {},
          }),
        },
      }),
    ];
  };

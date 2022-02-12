import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  overseer: MARKET_DENOMS;
  borrower: string;
}

export const fabricateOverseerLiquidateCollateral =
  ({ address, overseer, borrower }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address), validateAddress(borrower)]);

    const mmOverseer = addressProvider.overseer(overseer);

    return [
      new MsgExecuteContract(address, mmOverseer, {
        liquidate_collateral: {
          borrower: borrower,
        },
      }),
    ];
  };

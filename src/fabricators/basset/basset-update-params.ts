import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateIsNumber } from '../../utils/validation/number';
import { validateTrue } from '../../utils/validation/true';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  epoch_period?: number;
  unbonding_period?: number;
  peg_recovery_fee?: string;
  er_threshold?: string;
}

export const fabricatebAssetUpdateParams =
  ({
    address,
    epoch_period,
    unbonding_period,
    peg_recovery_fee,
    er_threshold,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      epoch_period ? validateIsNumber(epoch_period) : validateTrue,
      unbonding_period ? validateIsNumber(unbonding_period) : validateTrue,
      //TODO: validate decimal and denom
    ]);

    const bAssetContractAddress = addressProvider.bLunaHub();

    return [
      new MsgExecuteContract(address, bAssetContractAddress, {
        update_params: {
          epoch_period: epoch_period,
          unbonding_period: unbonding_period,
          peg_recovery_fee: peg_recovery_fee,
          er_threshold: er_threshold,
        },
      }),
    ];
  };

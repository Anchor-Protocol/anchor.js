import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { validateTrue } from '../../utils/validation/true';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
  owner?: string;
  anchor_token?: string;
  genesis_time?: string;
}

export const fabricateInvestorVestingUpdateConfig =
  ({ address, owner, anchor_token, genesis_time }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner ? validateAddress(owner) : validateTrue,
      anchor_token ? validateAddress(anchor_token) : validateTrue,
      genesis_time ? validateIsNumber(genesis_time) : validateTrue,
    ]);

    const investor = addressProvider.investorLock();

    return [
      new MsgExecuteContract(address, investor, {
        update_config: {
          owner,
          anchor_token,
          genesis_time,
        },
      }),
    ];
  };

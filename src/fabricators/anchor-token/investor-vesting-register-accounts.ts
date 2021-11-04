import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  vesting_accounts: string[];
}

export const fabricateInvestorVestingRegisterAccounts =
  ({ address, vesting_accounts }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    vesting_accounts.forEach((account) => {
      validateInput([validateAddress(account)]);
    });
    validateInput([validateAddress(address)]);

    const investor = addressProvider.investorLock();

    return [
      new MsgExecuteContract(address, investor, {
        register_vesting_accounts: {
          vesting_accounts,
        },
      }),
    ];
  };

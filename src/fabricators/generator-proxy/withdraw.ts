import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { validateIsGreaterThanZero } from '../../utils/validation/number';

interface Option {
  address: string;
  account: string;
  amount: string;
}

export const fabricateGeneratorProxyWithdraw =
  ({ address, account, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateAddress(account),
      validateIsGreaterThanZero(amount),
    ]);
    const generatorProxyAddress = addressProvider.ancGeneratorProxy();
    return [
      new MsgExecuteContract(address, generatorProxyAddress, {
        withdraw: {
          account,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

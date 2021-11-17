import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  recipient: string;
  amount: string;
}

export const fabricateCommunitySpend =
  ({ address, recipient, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const community = addressProvider.community();

    return [
      new MsgExecuteContract(address, community, {
        spend: {
          recipient,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

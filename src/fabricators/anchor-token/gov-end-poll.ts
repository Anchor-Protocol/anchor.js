import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  poll_id: number;
}

export const fabricateGovEndPoll =
  ({ address, poll_id }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const gov = addressProvider.gov();

    return [
      new MsgExecuteContract(address, gov, {
        end_poll: {
          poll_id,
        },
      }),
    ];
  };

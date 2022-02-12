import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  poll_id: number;
}

export const fabricateGovExecutePoll =
  ({ address, poll_id }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const gov = addressProvider.gov();

    return [
      new MsgExecuteContract(address, gov, {
        execute_poll: {
          poll_id,
        },
      }),
    ];
  };

import { MsgExecuteContract, Int, Dec } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

export type VoteOption = 'yes' | 'no';

interface Option {
  address: string;
  poll_id: number;
  vote: VoteOption;
  amount: string;
}

export const fabricateGovCastVote =
  ({ address, poll_id, vote, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const gov = addressProvider.gov();

    return [
      new MsgExecuteContract(address, gov, {
        cast_vote: {
          poll_id,
          vote,
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      }),
    ];
  };

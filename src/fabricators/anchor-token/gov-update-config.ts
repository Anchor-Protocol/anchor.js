import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  owner?: string;
  quorum?: string;
  threshold?: string;
  voting_period?: number;
  timelock_period?: number;
  expiration_period?: number;
  proposal_deposit?: string;
  snapshot_period?: number;
}

export const fabricateGovUpdateConfig =
  ({
    address,
    owner,
    quorum,
    threshold,
    voting_period,
    timelock_period,
    expiration_period,
    proposal_deposit,
    snapshot_period,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    if (owner) {
      validateInput([validateAddress(owner), validateAddress(address)]);
    } else {
      validateInput([validateAddress(address)]);
    }

    const gov = addressProvider.gov();

    return [
      new MsgExecuteContract(address, gov, {
        update_config: {
          owner,
          quorum,
          threshold,
          voting_period,
          timelock_period,
          expiration_period,
          proposal_deposit,
          snapshot_period,
        },
      }),
    ];
  };

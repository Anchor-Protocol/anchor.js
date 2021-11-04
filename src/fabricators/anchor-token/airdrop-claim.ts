import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  stage: number;
  amount: string;
  proof: string[];
}

export const fabricateAirdropClaim =
  ({ address, stage, amount, proof }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const airdrop = addressProvider.airdrop();

    return [
      new MsgExecuteContract(address, airdrop, {
        claim: {
          stage,
          amount,
          proof,
        },
      }),
    ];
  };

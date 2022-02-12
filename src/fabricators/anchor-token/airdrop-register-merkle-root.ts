import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  merkle_root: string;
}

export const fabricateAirdropRegisterMerkleRoot =
  ({ address, merkle_root }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const airdrop = addressProvider.airdrop();

    return [
      new MsgExecuteContract(address, airdrop, {
        register_merkle_root: {
          merkle_root,
        },
      }),
    ];
  };

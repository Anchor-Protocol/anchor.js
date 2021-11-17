import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { validateTrue } from '../../utils/validation/true';

interface Option {
  address: string;
  owner?: string;
}

export const fabricateAirdropUpdateConfig =
  ({ address, owner }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner ? validateAddress(owner) : validateTrue,
    ]);

    const airdrop = addressProvider.airdrop();

    return [
      new MsgExecuteContract(address, airdrop, {
        update_config: {
          owner,
        },
      }),
    ];
  };

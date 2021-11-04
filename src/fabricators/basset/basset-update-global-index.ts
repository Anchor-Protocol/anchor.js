import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  airdrop_hooks?: string[];
}

export const fabricatebAssetUpdateGlobalIndex =
  ({ address, airdrop_hooks }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const bAssetHubAddress = addressProvider.bLunaHub();

    return [
      new MsgExecuteContract(address, bAssetHubAddress, {
        update_global_index: {
          airdrop_hooks,
        },
      }),
    ];
  };

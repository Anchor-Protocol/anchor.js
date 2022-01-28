import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import { AddressProvider, BAssetAddressProvider } from '../../address-provider';

interface Option {
  address: string;
  bAsset: BAssetAddressProvider;
  owner?: string;
  liquidation_contract?: string;
}

export const fabricateCustodyUpdateConfig =
  ({ address, bAsset, liquidation_contract, owner }: Option) =>
  (_: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner ? validateAddress(owner) : validateTrue,
      liquidation_contract
        ? validateAddress(liquidation_contract)
        : validateTrue,
    ]);
    return [
      new MsgExecuteContract(address, bAsset.custody(), {
        update_config: {
          owner: owner,
          liquidation_contract: liquidation_contract,
        },
      }),
    ];
  };

import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  owner?: string;
  reward_contract?: string;
  token_contract?: string;
  airdrop_registry_contract: string;
}

export const fabricatebAssetUpdateConfig =
  ({
    address,
    owner,
    reward_contract,
    token_contract,
    airdrop_registry_contract,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      reward_contract ? validateAddress(reward_contract) : validateTrue,
      token_contract ? validateAddress(token_contract) : validateTrue,
    ]);

    const bAssetContractAddress = addressProvider.bLunaHub();

    return [
      new MsgExecuteContract(address, bAssetContractAddress, {
        update_config: {
          owner: owner,
          reward_contract: reward_contract,
          token_contract: token_contract,
          airdrop_registry_contract: airdrop_registry_contract,
        },
      }),
    ];
  };

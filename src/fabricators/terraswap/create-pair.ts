import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  native_token: string;
}

export const fabricateTerraswapCreatePair = ({
  address,
  native_token,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([validateAddress(address)]);

  const bAssetTokenAddress = addressProvider.bLunaToken();
  const terrawswapFactory = addressProvider.terraswapFactory();
  return [
    new MsgExecuteContract(address, terrawswapFactory, {
      create_pair: {
        asset_infos: [
          {
            token: {
              contract_addr: bAssetTokenAddress,
            },
          },
          {
            native_token: {
              denom: native_token,
            },
          },
        ],
      },
    }),
  ];
};

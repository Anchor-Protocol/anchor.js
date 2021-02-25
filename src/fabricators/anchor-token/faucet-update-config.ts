import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  spend_limit?: string;
}

export const fabricateFaucetConfig = ({ address, spend_limit }: Option) => (
  addressProvider: AddressProvider,
): MsgExecuteContract[] => {
  validateInput([validateAddress(address)]);

  const faucet = addressProvider.faucet();

  return [
    new MsgExecuteContract(address, faucet, {
      update_config: {
        spend_limit,
      },
    }),
  ];
};

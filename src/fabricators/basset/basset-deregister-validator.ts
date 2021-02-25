import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateValAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string; // sender address
  validatorAddress: string; // validator address to whitelist
}

/**
 * @param address Client’s Terra address.
 */
export const fabricateDeRegisterValidator = ({
  address,
  validatorAddress,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([validateValAddress(validatorAddress)]);

  const bAssetHubAddress = addressProvider.blunaHub('bluna');

  return [
    new MsgExecuteContract(address, bAssetHubAddress, {
      deregister_validator: {
        validator: validatorAddress,
      },
    }),
  ];
};

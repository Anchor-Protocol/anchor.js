import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateValAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string; // sender address
  validator: string; // validator address to whitelist
}

/**
 * @param address Validator Terra address.
 */
export const fabricatebAssetDeregisterValidator =
  ({ address, validator }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateValAddress(validator)]);

    const bAssetHubAddress = addressProvider.bLunaHub();

    return [
      new MsgExecuteContract(address, bAssetHubAddress, {
        deregister_validator: {
          validator: validator,
        },
      }),
    ];
  };

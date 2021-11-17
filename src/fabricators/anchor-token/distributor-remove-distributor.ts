import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  distributor: string;
}

export const fabricateDistributorRemoveDistributor =
  ({ address, distributor }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const distributorAdd = addressProvider.distributor();

    return [
      new MsgExecuteContract(address, distributorAdd, {
        remove_distributor: {
          distributor,
        },
      }),
    ];
  };

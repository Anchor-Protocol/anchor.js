import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import {
  AddressProvider,
  CUSTODY_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  owner?: string;
  liquidation_contract?: string;
  custody: CUSTODY_DENOMS;
}

export const fabricateCustodyUpdateConfig = ({
  address,
  liquidation_contract,
  owner,
  custody,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    owner ? validateAddress(owner) : validateTrue,
    liquidation_contract ? validateAddress(liquidation_contract) : validateTrue,
  ]);

  const mmCustody = addressProvider.custody(custody);

  return [
    new MsgExecuteContract(address, mmCustody, {
      update_config: {
        owner: owner,
        liquidation_contract: liquidation_contract,
      },
    }),
  ];
};

import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import {
  AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  collateral: COLLATERAL_DENOMS;
  owner?: string;
  liquidation_contract?: string;
}

export const fabricateCustodyUpdateConfig =
  ({ address, market, collateral, liquidation_contract, owner }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner ? validateAddress(owner) : validateTrue,
      liquidation_contract
        ? validateAddress(liquidation_contract)
        : validateTrue,
    ]);

    const mmCustody = addressProvider.custody(market, collateral);

    return [
      new MsgExecuteContract(address, mmCustody, {
        update_config: {
          owner: owner,
          liquidation_contract: liquidation_contract,
        },
      }),
    ];
  };

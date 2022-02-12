import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  overseer: MARKET_DENOMS;
  collateral_token: string;
  custody_contract?: string;
  max_ltv?: string;
}

export const fabricateOverseerUpdateWhitelist =
  ({
    address,
    overseer,
    collateral_token,
    custody_contract,
    max_ltv,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateAddress(collateral_token),
      custody_contract ? validateAddress(custody_contract) : validateTrue,
    ]);

    const mmOverseer = addressProvider.overseer(overseer);

    return [
      new MsgExecuteContract(address, mmOverseer, {
        update_whitelist: {
          collateral_token: collateral_token,
          custody_contract: custody_contract,
          max_ltv: max_ltv,
        },
      }),
    ];
  };

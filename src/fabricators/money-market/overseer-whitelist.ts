import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  overseer: MARKET_DENOMS;
  name: string;
  symbol: string;
  collateral_token: string;
  custody_contract: string;
  max_ltv?: string;
}

export const fabricateOverseerWhitelist =
  ({
    address,
    overseer,
    name,
    symbol,
    collateral_token,
    custody_contract,
    max_ltv,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateAddress(collateral_token),
      validateAddress(custody_contract),
    ]);

    const mmOverseer = addressProvider.overseer(overseer);

    return [
      new MsgExecuteContract(address, mmOverseer, {
        whitelist: {
          name: name,
          symbol: symbol,
          collateral_token: collateral_token,
          custody_contract: custody_contract,
          max_ltv: max_ltv,
        },
      }),
    ];
  };

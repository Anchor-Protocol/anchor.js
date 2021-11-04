import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import { AddressProvider } from '../../address-provider/provider';
import { MARKET_DENOMS } from '../../address-provider';
import { validateIsNumber } from '../../utils/validation/number';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  owner_addr?: string;
  interest_model?: string;
  distribution_model?: string;
  reserve_factor?: string;
  max_borrow_factor?: string;
}

export const fabricateMarketUpdateConfig =
  ({
    address,
    owner_addr,
    interest_model,
    distribution_model,
    reserve_factor,
    max_borrow_factor,
    market,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner_addr ? validateAddress(owner_addr) : validateTrue,
      interest_model ? validateAddress(interest_model) : validateTrue,
      reserve_factor ? validateIsNumber(reserve_factor) : validateTrue,
      max_borrow_factor ? validateIsNumber(max_borrow_factor) : validateTrue,
    ]);

    const mmMarket = addressProvider.market(market);

    return [
      new MsgExecuteContract(address, mmMarket, {
        update_config: {
          owner_addr,
          interest_model,
          distribution_model,
          reserve_factor,
          max_borrow_factor,
        },
      }),
    ];
  };

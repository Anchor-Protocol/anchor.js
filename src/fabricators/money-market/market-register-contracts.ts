import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { MARKET_DENOMS } from '../../address-provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  overseer_contract: string;
  interest_model: string;
  distribution_model: string;
  collector_contract: string;
  distributor_contract: string;
}

export const fabricatebMarketRegisterContracts =
  ({
    address,
    overseer_contract,
    market,
    interest_model,
    distribution_model,
    collector_contract,
    distributor_contract,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateAddress(overseer_contract),
    ]);

    const mmMarket = addressProvider.market(market);

    return [
      new MsgExecuteContract(address, mmMarket, {
        register_contracts: {
          overseer_contract: overseer_contract,
          interest_model: interest_model,
          distribution_model: distribution_model,
          collector_contract: collector_contract,
          distributor_contract: distributor_contract,
        },
      }),
    ];
  };

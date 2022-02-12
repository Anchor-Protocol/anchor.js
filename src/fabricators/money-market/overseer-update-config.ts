import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { validateTrue } from '../../utils/validation/true';
import { validateIsNumber } from '../../utils/validation/number';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  overseer: MARKET_DENOMS;
  owner_addr?: string;
  oracle_contract?: string;
  liquidation_contract?: string;
  threshold_deposit_rate?: string;
  target_deposit_rate?: string;
  buffer_distribution_factor?: string;
  anc_purchase_factor?: string;
  epoch_period?: number;
  price_timeframe?: number;
}

export const fabricateOverseerUpdateConfig =
  ({
    address,
    overseer,
    owner_addr,
    oracle_contract,
    liquidation_contract,
    threshold_deposit_rate,
    target_deposit_rate,
    buffer_distribution_factor,
    anc_purchase_factor,
    epoch_period,
    price_timeframe,
  }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      owner_addr ? validateAddress(owner_addr) : validateTrue,
      oracle_contract ? validateAddress(oracle_contract) : validateTrue,
      liquidation_contract
        ? validateAddress(liquidation_contract)
        : validateTrue,
      epoch_period ? validateIsNumber(epoch_period) : validateTrue,
      epoch_period ? validateIsNumber(epoch_period) : validateTrue,
    ]);

    const mmOverseer = addressProvider.overseer(overseer);

    return [
      new MsgExecuteContract(address, mmOverseer, {
        update_config: {
          owner_addr: owner_addr,
          oracle_contract: oracle_contract,
          liquidation_contract: liquidation_contract,
          threshold_deposit_rate: threshold_deposit_rate,
          target_deposit_rate: target_deposit_rate,
          buffer_distribution_factor: buffer_distribution_factor,
          anc_purchase_factor: anc_purchase_factor,
          epoch_period: epoch_period,
          price_timeframe: price_timeframe,
        },
      }),
    ];
  };

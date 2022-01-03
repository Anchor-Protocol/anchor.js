import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider, COLLATERAL_DENOMS } from '../../address-provider';

interface Option {
  lcd: LCDClient;
  converter_contract_address: string;
}

interface ConfigResponse {
  owner: string;
  wormhole_token_address: string;
  anchor_token_address: string;
}

export const querybAssetConverterConfig =
  ({ lcd, converter_contract_address }: Option) =>
  async (_: AddressProvider): Promise<ConfigResponse> => {
    return lcd.wasm.contractQuery(converter_contract_address, {
      config: {},
    });
  };

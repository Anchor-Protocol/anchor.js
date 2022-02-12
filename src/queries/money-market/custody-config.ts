import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  custody_contract_address: string;
}

interface ConfigResponse {
  owner: string;
  collateral_token: string;
  overseer_contract: string;
  market_contract: string;
  reward_contract: string;
  liquidation_contract: string;
  stable_denom: string;
  basset_info: BAssetInfo;
}

interface BAssetInfo {
  name: string;
  symbol: string;
  decimals: string;
}

export const queryCustodyConfig =
  ({ lcd, custody_contract_address }: Option) =>
  async (_: AddressProvider): Promise<ConfigResponse> => {
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      custody_contract_address,
      {
        config: {},
      },
    );
    return response;
  };

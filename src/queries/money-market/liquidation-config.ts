import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
}
interface ConfigResponse {
  owner: string;
  oracle_contract: string;
  stable_denom: string;
  safe_ratio: string;
  bid_fee: string;
  max_premium_rate: string;
  liquidation_threshold: string;
  price_timeframe: number;
}

export const queryLiquidationConfig =
  ({ lcd }: Option) =>
  async (addressProvider: AddressProvider): Promise<ConfigResponse> => {
    const liquidationContractAddress = addressProvider.liquidation();
    const response: ConfigResponse = await lcd.wasm.contractQuery(
      liquidationContractAddress,
      {
        config: {},
      },
    );
    return response;
  };

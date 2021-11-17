import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  pair_contract_address: string;
}
interface PoolResponse {
  assets: Asset[];
  total_share: string;
}

interface Asset {
  info: string;
  amount: string;
}

export const queryTerraswapPool =
  ({ lcd, pair_contract_address }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<PoolResponse> => {
    const response: PoolResponse = await lcd.wasm.contractQuery(
      pair_contract_address,
      {
        pool: {},
      },
    );
    return response;
  };

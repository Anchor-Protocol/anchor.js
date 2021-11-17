import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

type AssetInfo =
  | { token: { contract_addr: string } }
  | { native_token: { denom: string } };

interface Option {
  lcd: LCDClient;
  pair_contract_address: string;
}

interface PairInfo {
  assetInfos: AssetInfo[];
  contractAddr: string;
  liquidityToken: string;
}

export const queryTerrasawpPair =
  ({ lcd, pair_contract_address }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<PairInfo> => {
    const response: PairInfo = await lcd.wasm.contractQuery(
      pair_contract_address,
      {
        pair: {},
      },
    );
    return response;
  };

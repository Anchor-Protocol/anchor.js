import { LCDClient } from '@terra-money/terra.js';

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

export const queryTerrasawpPair = async ({
  lcd,
  pair_contract_address,
}: Option): Promise<PairInfo> => {
  const response: PairInfo = await lcd.wasm.contractQuery(
    pair_contract_address,
    {
      pair: {},
    },
  );
  return response;
};

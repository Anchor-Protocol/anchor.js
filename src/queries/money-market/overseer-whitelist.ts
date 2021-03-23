import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: string;
  collateral_token?: string;
  start_after?: string;
  limit?: number;
}
interface WhitelistResponse {
  elems: WhitelistResponseElem[];
}

interface WhitelistResponseElem {
  name: string;
  symbol: string;
  max_ltv: string;
  custody_contract: string;
  collateral_token: string;
}

export const queryOverseerWhitelist = ({
  lcd,
  overseer,
  collateral_token,
  start_after,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<WhitelistResponse> => {
  const overseerContractAddress = addressProvider.overseer(overseer);
  const response: WhitelistResponse = await lcd.wasm.contractQuery(
    overseerContractAddress,
    {
      whitelist: {
        collateral_token: collateral_token,
        start_after: start_after,
        limit: limit,
      },
    },
  );
  return response;
};

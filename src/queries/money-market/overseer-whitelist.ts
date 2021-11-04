import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  market: MARKET_DENOMS;
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

export const queryOverseerWhitelist =
  ({ lcd, market, collateral_token, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<WhitelistResponse> => {
    const overseerContractAddress = addressProvider.overseer(market);
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

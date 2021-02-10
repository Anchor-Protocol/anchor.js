import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: string;
  collateralToken?: string;
  startAfter?: string;
  limit?: number;
}
interface WhitelistResponse {
  elems: object[];
}

export const queryOverseerWhitelist = ({
  lcd,
  overseer,
  collateralToken,
  startAfter,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<WhitelistResponse> => {
  const overseerContractAddress = addressProvider.overseer(overseer);
  let response: WhitelistResponse = await lcd.wasm.contractQuery(
    overseerContractAddress,
    {
      whitelist: {
        collateral_token: collateralToken,
        start_after: startAfter,
        limit:limit,
      },
    },
  );
  return response;
};

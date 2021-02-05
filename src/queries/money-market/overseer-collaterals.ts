import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: string;
  borrower: string;
}
interface CollateralResponse {
  borrower: string;
  collaterals: object;
}

export const queryOverseerCollaterals = ({
  lcd,
  overseer,
  borrower,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<CollateralResponse> => {
  const overseerContractAddress = addressProvider.overseer(overseer);
  let response: CollateralResponse = await lcd.wasm.contractQuery(
    overseerContractAddress,
    {
      collaterals: {
        borrower: borrower,
      },
    },
  );
  return response;
};

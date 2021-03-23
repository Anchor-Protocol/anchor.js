import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  custody: string;
  address: string;
}
export interface BorrowerResponse {
  borrower: string;
  balance: string;
  spendable: string;
}

export const queryCustodyBorrower = ({
  lcd,
  custody,
  address,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BorrowerResponse> => {
  const custodyContractAddress = addressProvider.custody(custody);
  const response: BorrowerResponse = await lcd.wasm.contractQuery(
    custodyContractAddress,
    {
      borrower: {
        address: address,
      },
    },
  );
  return response;
};

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { BorrowerResponse } from 'queries';

interface Option {
  lcd: LCDClient;
  custody: string;
  start_after?: string;
  limit?: number;
}
interface BorrowersResponse {
  borrowers: BorrowerResponse[];
}

export const queryCustodyBorrowers = ({
  lcd,
  custody,
  start_after,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BorrowersResponse> => {
  const custodyContractAddress = addressProvider.custody(custody);
  const response: BorrowersResponse = await lcd.wasm.contractQuery(
    custodyContractAddress,
    {
      borrowers: {
        start_after: start_after,
        limit: limit,
      },
    },
  );
  return response;
};

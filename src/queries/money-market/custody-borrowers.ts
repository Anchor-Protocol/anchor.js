import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  custody: string;
  startAfter?: string;
  limit?: number;
}
interface BorrowersResponse {
  borrowers: object[];
}

export const queryCustodyBorrowers = ({
  lcd,
  custody,
  startAfter,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<BorrowersResponse> => {
  const custodyContractAddress = addressProvider.custody(custody);
  let response: BorrowersResponse = await lcd.wasm.contractQuery(
    custodyContractAddress,
    {
      borrowers: {
        start_after: startAfter,
        limit: +limit,
      },
    },
  );
  return response;
};

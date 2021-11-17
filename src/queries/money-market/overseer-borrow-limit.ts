import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  overseer: MARKET_DENOMS;
  borrower: string;
  block_time?: number;
}
interface BorrowLimitResponse {
  borrower: string;
  borrow_limit: string;
}

export const queryOverseerBorrowLimit =
  ({ lcd, overseer, borrower, block_time }: Option) =>
  async (addressProvider: AddressProvider): Promise<BorrowLimitResponse> => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    const response: BorrowLimitResponse = await lcd.wasm.contractQuery(
      overseerContractAddress,
      {
        borrow_limit: {
          borrower: borrower,
          block_time: block_time || undefined,
        },
      },
    );
    return response;
  };

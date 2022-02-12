import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { PollResponse, PollStatus } from './gov-poll';

interface Option {
  lcd: LCDClient;
  filter: PollStatus;
  start_after?: number;
  limit?: number;
}

interface PollsResponse {
  polls: PollResponse[];
}

export const queryGovPolls =
  ({ lcd, filter, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<PollsResponse> => {
    const gov = addressProvider.gov();
    const response: PollsResponse = await lcd.wasm.contractQuery(gov, {
      polls: {
        filter,
        start_after,
        limit,
      },
    });
    return response;
  };

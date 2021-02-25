import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
import { PollResponse, PollStatus } from './gov-poll';

interface Option {
  lcd: LCDClient;
  filter: PollStatus;
  start_after?: number;
  limit?: number;
}

export const queryGovPolls = ({
  lcd,
  filter,
  start_after,
  limit,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<PollResponse> => {
  const gov = addressProvider.gov();
  let response: PollResponse = await lcd.wasm.contractQuery(gov, {
    polls: {
      filter,
      start_after,
      limit,
    },
  });
  return response;
};

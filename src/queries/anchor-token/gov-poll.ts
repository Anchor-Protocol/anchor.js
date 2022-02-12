import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface ExecuteMsg {
  contract: string;
  msg: string;
}

export type PollStatus = 'in_progress' | 'passed' | 'rejected' | 'executed';

interface Option {
  lcd: LCDClient;
  poll_id: number;
}

export interface PollResponse {
  id: number;
  creator: string;
  status: PollStatus;
  end_height: number;
  title: string;
  description: string;
  link?: string;
  deposit_amount: string;
  execute_data?: ExecuteMsg;
  yes_votes: string;
  no_votes: string;
  staked_amount?: string;
  total_balance_at_end_poll?: string;
}

export const queryGovPoll =
  ({ lcd, poll_id }: Option) =>
  async (addressProvider: AddressProvider): Promise<PollResponse> => {
    const gov = addressProvider.gov();
    const response: PollResponse = await lcd.wasm.contractQuery(gov, {
      poll: {
        poll_id: +poll_id,
      },
    });
    return response;
  };

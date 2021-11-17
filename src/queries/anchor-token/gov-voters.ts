import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  poll_id: number;
  start_after?: string;
  limit?: number;
}

type VoteOption = 'yes' | 'no';

export interface VotersResponseItem {
  voter: string;
  vote: VoteOption;
  share: string;
  balance: string;
}

export interface VotersResponse {
  voters: Array<VotersResponseItem>;
}

export const queryGovVoters =
  ({ lcd, poll_id, start_after, limit }: Option) =>
  async (addressProvider: AddressProvider): Promise<VotersResponse> => {
    const gov = addressProvider.gov();
    const response: VotersResponse = await lcd.wasm.contractQuery(gov, {
      voters: {
        poll_id,
        start_after,
        limit,
      },
    });
    return response;
  };

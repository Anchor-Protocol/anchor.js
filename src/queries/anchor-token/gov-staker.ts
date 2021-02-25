import { LCDClient, MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  address: string;
}

export type VoteOption = 'yes' | 'no';

export interface VoterInfo {
  vote: VoteOption;
  share: string;
}

export interface StakerResponse {
  balance: string;
  share: string;
  locked_share: Array<[number, VoterInfo]>;
}

export const queryGovStaker = ({ lcd, address }: Option) => async (
  addressProvider: AddressProvider,
): Promise<StakerResponse> => {
  const gov = addressProvider.gov();
  let response: StakerResponse = await lcd.wasm.contractQuery(gov, {
    staker: {
      address,
    },
  });
  return response;
};

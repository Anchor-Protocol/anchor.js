import { LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../..';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  custody: BAssetAddressProvider | string;
  address: string;
}

export interface BorrowerResponse {
  borrower: string;
  balance: string;
  spendable: string;
}

export const queryCustodyBorrower =
  ({ lcd, custody, address }: Option) =>
  async (_: AddressProvider): Promise<BorrowerResponse> => {
    const custodyAddress =
      typeof custody === 'string'
        ? custody
        : (custody as BAssetAddressProvider).custody();

    return lcd.wasm.contractQuery<BorrowerResponse>(custodyAddress, {
      borrower: {
        address: address,
      },
    });
  };

import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
}

export const queryGeneratorProxyDeposit =
  ({ lcd }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (addressProvider: AddressProvider): Promise<string> => {
    const response: string = await lcd.wasm.contractQuery(
      addressProvider.ancGeneratorProxy(),
      { deposit: {} },
    );
    return response;
  };

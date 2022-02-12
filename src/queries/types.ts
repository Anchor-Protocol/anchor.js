import { AddressProvider } from '..';

export type QueryOptionType<T> = T extends Querier<infer Option, unknown>
  ? Option
  : null;
export type QueryResponseType<T> = T extends Querier<unknown, infer Response>
  ? Promise<Response>
  : Promise<unknown>;
export type Querier<T, R> = (
  option: T,
) => (addressProvider: AddressProvider) => Promise<R>;

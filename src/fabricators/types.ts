import { Msg } from '@terra-money/terra.js';
import { AddressProvider } from '..';

export type Expire =
  | { at_height: number }
  | { at_time: number }
  // eslint-disable-next-line @typescript-eslint/ban-types
  | { never: {} };

export type OptionType<T> = T extends Fabricator<infer Option>
  ? OmitAddress<Option>
  : null;
export type Fabricator<T> = (
  option: T,
) => (addressProvider: AddressProvider) => Msg[];
export type OmitAddress<T> = Omit<T, 'address'>;
export type OmitLCD<T> = Omit<T, 'lcd'>;

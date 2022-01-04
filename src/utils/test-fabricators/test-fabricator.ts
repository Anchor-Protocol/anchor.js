import { AddressProvider, BAssetAddressProvider } from '../../address-provider';
import { Msg } from '@terra-money/terra.js';

export function testFabricator<
  T,
  TAddressProvider,
  FabricatorType extends (
    option: T,
  ) => (addressProvider: TAddressProvider) => Msg[],
>(
  expect: jest.Expect,
  fabricator: FabricatorType,
  input: T,
  address_provider: TAddressProvider,
  expectedOutput: ReturnType<ReturnType<FabricatorType>>,
): void {
  const output = fabricator(input);

  expect(output(address_provider)).toEqual(expectedOutput);
}

export function testCw20Fabricator<
  T,
  FabricatorType extends (option: T) => Msg[],
>(
  expect: jest.Expect,
  fabricator: FabricatorType,
  input: T,
  expectedOutput: ReturnType<FabricatorType>,
): void {
  const output = fabricator(input);
  expect(output).toEqual(expectedOutput);
}

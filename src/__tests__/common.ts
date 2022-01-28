import {
  AddressProviderFromJson,
  BAssetAddressProviderImpl,
  bAssetAddressesBombay12,
  bombay12,
} from '../address-provider';

export const addressProvider = new AddressProviderFromJson(bombay12);

export const bLUNA = new BAssetAddressProviderImpl(
  bAssetAddressesBombay12['bLUNA'],
);

export const bETH = new BAssetAddressProviderImpl(
  bAssetAddressesBombay12['bETH'],
);

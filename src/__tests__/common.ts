import {
  AddressProviderFromJson,
  BAssetAddressProviderImpl,
  bAssetBombay12,
  bombay12,
} from '../address-provider';

export const addressProvider = new AddressProviderFromJson(bombay12);

export const bLUNA = new BAssetAddressProviderImpl(bAssetBombay12['bLUNA']);

export const bETH = new BAssetAddressProviderImpl(bAssetBombay12['bETH']);

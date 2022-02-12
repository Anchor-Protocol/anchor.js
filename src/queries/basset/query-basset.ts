import { LCDClient } from '@terra-money/terra.js';
import {
  querybAssetConverterConfig,
  queryCustodyConfig,
  queryOverseerWhitelist,
  queryTokenInfo,
  queryTokenMinter,
  WhitelistResponseElem,
} from '..';
import { BAsset } from '../..';
import {
  AddressProvider,
  BAssetAddressProviderImpl,
  MARKET_DENOMS,
} from '../../address-provider';

type AssetOption =
  | WhitelistResponseElem
  | { symbol: string; market: MARKET_DENOMS };

interface Option {
  lcd: LCDClient;
  asset: AssetOption;
}

const queryAddressProvider = async (
  lcd: LCDClient,
  addressProvider: AddressProvider,
  asset: WhitelistResponseElem,
): Promise<BAssetAddressProviderImpl> => {
  // dynamically discover the contract addresses for the bAsset collateral
  const { collateral_token, custody_contract } = asset;

  const { minter } = await queryTokenMinter({
    lcd,
    token_address: collateral_token,
  })(addressProvider);

  const { reward_contract } = await queryCustodyConfig({
    lcd,
    custody_contract_address: custody_contract,
  })(addressProvider);

  const { wormhole_token_address } = await querybAssetConverterConfig({
    lcd,
    converter_contract_address: minter,
  })(addressProvider);

  return new BAssetAddressProviderImpl({
    token: collateral_token,
    custody: custody_contract,
    reward: reward_contract,
    converter: minter,
    wormhole: wormhole_token_address,
  });
};

const queryWormholeTokenDecimals = async (
  lcd: LCDClient,
  addressProvider: AddressProvider,
  wormholeTokenAddress: string,
): Promise<number> => {
  const token = await queryTokenInfo({
    lcd,
    token_address: wormholeTokenAddress,
  })(addressProvider);
  return token?.decimals;
};

const querybAssetWhitelistElem = async (
  lcd: LCDClient,
  addressProvider: AddressProvider,
  asset: AssetOption,
): Promise<WhitelistResponseElem | undefined> => {
  // need to perform a lookup on the elem first
  if ('market' in asset) {
    const { symbol, market } = asset;
    const response = await queryOverseerWhitelist({
      lcd,
      market,
    })(addressProvider);
    const index = response.elems.findIndex((elem) => elem.symbol === symbol);
    return index < 0 ? undefined : response.elems[index];
  }
  return asset;
};

export const querybAsset =
  ({ lcd, asset }: Option) =>
  async (addressProvider: AddressProvider): Promise<BAsset | undefined> => {
    const whitelistElem = await querybAssetWhitelistElem(
      lcd,
      addressProvider,
      asset,
    );
    if (whitelistElem === undefined) {
      return undefined;
    }
    const bAssetAddressProvider = await queryAddressProvider(
      lcd,
      addressProvider,
      whitelistElem,
    );
    if (bAssetAddressProvider.wormhole()) {
      const wormholeTokenDecimals = await queryWormholeTokenDecimals(
        lcd,
        addressProvider,
        bAssetAddressProvider.wormhole(),
      );
      return new BAsset({
        lcd,
        addressProvider,
        bAssetAddressProvider,
        wormhole: { decimals: wormholeTokenDecimals },
      });
    }
    return new BAsset({ lcd, addressProvider, bAssetAddressProvider });
  };

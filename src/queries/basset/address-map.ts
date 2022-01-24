import { LCDClient } from '@terra-money/terra.js';
import {
  querybAssetConverterConfig,
  queryCustodyConfig,
  queryOverseerWhitelist,
  queryTokenMinter,
  WhitelistResponseElem,
} from '..';
import { BAsset } from '../..';
import {
  AddressProvider,
  BAssetAddressProviderImpl,
  MARKET_DENOMS,
} from '../../address-provider';

interface Option {
  lcd: LCDClient;
  asset: WhitelistResponseElem | { symbol: string; market: MARKET_DENOMS };
}

const queryAddressMap = async (
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

export const querybAsset =
  ({ lcd, asset }: Option) =>
  async (addressProvider: AddressProvider): Promise<BAsset | undefined> => {
    // need to perform a lookup on the elem first
    if ('market' in asset) {
      const { symbol, market } = asset;
      const response = await queryOverseerWhitelist({
        lcd,
        market,
      })(addressProvider);
      const index = response.elems.findIndex((elem) => elem.symbol === symbol);
      return index < 0
        ? undefined
        : new BAsset(
            lcd,
            addressProvider,
            await queryAddressMap(lcd, addressProvider, response.elems[index]),
          );
    }
    return new BAsset(
      lcd,
      addressProvider,
      await queryAddressMap(lcd, addressProvider, asset),
    );
  };

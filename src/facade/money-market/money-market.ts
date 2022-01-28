import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
  queryOverseerWhitelist,
  WhitelistResponseElem,
} from '../..';

export interface GetCollateralWhitelistOptions {
  market: MARKET_DENOMS;
  collateralToken?: string;
}

export class MoneyMarket {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  async getCollateralWhitelist(
    options: GetCollateralWhitelistOptions,
  ): Promise<WhitelistResponseElem[]> {
    const { market, collateralToken } = options;
    const response = await queryOverseerWhitelist({
      lcd: this._lcd,
      market,
      collateral_token: collateralToken,
    })(this._addressProvider);
    return response.elems;
  }
}

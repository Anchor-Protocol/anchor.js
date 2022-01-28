import { LCDClient } from '@terra-money/terra.js';
import { BAsset } from '.';
import { AddressProvider, MARKET_DENOMS } from '../address-provider';
import { WhitelistResponseElem } from '../queries';
import { querybAsset } from '../queries/basset/query-basset';
import { AnchorToken } from './anchor-token/anchor-token';
import { BLuna } from './bluna/bluna';
import { Borrow } from './borrow/borrow';
import { Earn } from './earn/earn';
import { MoneyMarket } from './money-market/money-market';

// the frontier
export class Anchor {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  // sub-facades
  earn!: Earn;
  borrow!: Borrow;
  bluna!: BLuna;
  anchorToken!: AnchorToken;
  moneyMarket!: MoneyMarket;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
    this.earn = new Earn(lcd, addressProvider);
    this.borrow = new Borrow(lcd, addressProvider);
    this.bluna = new BLuna(lcd, addressProvider);
    this.anchorToken = new AnchorToken(lcd, addressProvider);
    this.moneyMarket = new MoneyMarket(lcd, addressProvider);
  }

  async bAsset(
    collateral:
      | WhitelistResponseElem
      | { symbol: string; market: MARKET_DENOMS },
  ): Promise<BAsset | undefined> {
    return await querybAsset({ lcd: this._lcd, asset: collateral })(
      this._addressProvider,
    );
  }
}

import { LCDClient } from '@terra-money/terra.js';
import { BAsset } from '.';
import {
  AddressProvider,
  BAssetAddressMap,
  BAssetAddressProviderImpl,
} from '../address-provider';
import { WhitelistResponseElem } from '../queries';
import { querybAsset } from '../queries/basset/address-map';
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
    collateral: BAssetAddressMap | WhitelistResponseElem,
  ): Promise<BAsset | undefined> {
    // we are using an address map so can return just this
    if ('token' in collateral) {
      return new BAsset(
        this._lcd,
        this._addressProvider,
        new BAssetAddressProviderImpl(collateral),
      );
    }
    return await querybAsset({ lcd: this._lcd, asset: collateral })(
      this._addressProvider,
    );
  }
}

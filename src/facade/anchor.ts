import { LCDClient } from '@terra-money/terra.js';
import { BAsset } from '.';
import {
  AddressProvider,
  BAssetAddressProviderImpl,
} from '../address-provider';
import {
  querybAssetConverterConfig,
  queryCustodyConfig,
  queryTokenMinter,
  WhitelistResponseElem,
} from '../queries';
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

  async bAsset(collateral: WhitelistResponseElem): Promise<BAsset> {
    const { collateral_token, custody_contract } = collateral;

    const { minter } = await queryTokenMinter({
      lcd: this._lcd,
      token_address: collateral_token,
    })(this._addressProvider);

    const { reward_contract } = await queryCustodyConfig({
      lcd: this._lcd,
      custody_contract_address: custody_contract,
    })(this._addressProvider);

    const { wormhole_token_address } = await querybAssetConverterConfig({
      lcd: this._lcd,
      converter_contract_address: minter,
    })(this._addressProvider);

    return new BAsset(
      this._lcd,
      new BAssetAddressProviderImpl({
        token: collateral_token,
        custody: custody_contract,
        reward: reward_contract,
        converter: minter,
        wormhole: wormhole_token_address,
      }),
    );
  }
}

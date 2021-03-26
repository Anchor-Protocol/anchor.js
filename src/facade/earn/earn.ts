import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  fabricateMarketDepositStableCoin,
  fabricateMarketRedeemStable,
} from '../../fabricators';
import {
  queryMarketEpochState,
  queryOverseerEpochState,
  queryTokenBalance,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';
import { Int, Dec } from '@terra-money/terra.js';
import { BLOCKS_PER_YEAR } from '../../constants';

export class Earn {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  depositStable(market: MARKET_DENOMS, amount: string): Operation {
    return new OperationImpl(
      fabricateMarketDepositStableCoin,
      { market, amount },
      this._addressProvider,
    );
  }

  withdrawStable(market: MARKET_DENOMS, amount: string): Operation {
    return new OperationImpl(
      fabricateMarketRedeemStable,
      { market, amount },
      this._addressProvider,
    );
  }

  async getTotalDeposit(
    market: MARKET_DENOMS,
    address: string,
  ): Promise<string> {
    const epochState = await queryMarketEpochState({ lcd: this._lcd, market })(
      this._addressProvider,
    );
    const userATerraBalance = await queryTokenBalance({
      lcd: this._lcd,
      address,
      token_address: this._addressProvider.aTerra(market),
    })(this._addressProvider);

    return new Int(
      new Dec(epochState.exchange_rate).mul(userATerraBalance.balance),
    ).div(1000000).toString();
  }

  async getAPY(market: MARKET_DENOMS): Promise<number> {
    const epochState = await queryOverseerEpochState({ lcd: this._lcd, market })(
      this._addressProvider,
    );
    return new Dec(epochState.deposit_rate).mul(BLOCKS_PER_YEAR).toNumber();
  }
}

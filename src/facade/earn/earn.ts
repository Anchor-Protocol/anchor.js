import { Int, Dec, LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  fabricateMarketDepositStableCoin,
  fabricateMarketRedeemStable,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import {
  queryMarketEpochState,
  queryOverseerEpochState,
  queryTokenBalance,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';
import { BLOCKS_PER_YEAR } from '../../constants';

export type EarnDepositStableOption = OmitAddress<
  OptionType<typeof fabricateMarketDepositStableCoin>
>;
export type EarnWithdrawStableOption = OmitAddress<
  OptionType<typeof fabricateMarketRedeemStable>
>;

export interface GetTotalDepositOption {
  market: MARKET_DENOMS;
  address: string;
}

export interface GetApyOption {
  market: MARKET_DENOMS;
}

export class Earn {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  depositStable(depositStableOption: EarnDepositStableOption): Operation {
    return new OperationImpl(
      fabricateMarketDepositStableCoin,
      depositStableOption,
      this._addressProvider,
    );
  }

  withdrawStable(withdrawStableOption: EarnWithdrawStableOption): Operation {
    return new OperationImpl(
      fabricateMarketRedeemStable,
      withdrawStableOption,
      this._addressProvider,
    );
  }

  async getTotalDeposit(
    getTotalDepositOption: GetTotalDepositOption,
  ): Promise<string> {
    const epochState = await queryMarketEpochState({
      lcd: this._lcd,
      market: getTotalDepositOption.market,
    })(this._addressProvider);
    const userATerraBalance = await queryTokenBalance({
      lcd: this._lcd,
      address: getTotalDepositOption.address,
      token_address: this._addressProvider.aTerra(getTotalDepositOption.market),
    })(this._addressProvider);

    return new Int(
      new Dec(epochState.exchange_rate).mul(userATerraBalance.balance),
    )
      .div(1000000)
      .toString();
  }

  async getAPY(getAPYOption: GetApyOption): Promise<number> {
    const epochState = await queryOverseerEpochState({
      lcd: this._lcd,
      ...getAPYOption,
    })(this._addressProvider);
    return new Dec(epochState.deposit_rate).mul(BLOCKS_PER_YEAR).toNumber();
  }
}

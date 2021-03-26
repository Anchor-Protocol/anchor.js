import { LCDClient } from "@terra-money/terra.js";
import { AddressProvider } from "../../address-provider";
import { fabricateMarketDepositStableCoin, fabricateMarketRedeemStable } from "../../fabricators";
import { queryMarketEpochState, queryOverseerEpochState, queryTokenBalance } from "../../queries";
import { Operation, OperationImpl } from "../operation";
import { Int, Dec } from '@terra-money/terra.js'
import { BLOCKS_PER_YEAR } from '../../constants'
import { AnchorMarkets } from "../types";

export class Earn {
  lcd!: LCDClient
  addressProvider!: AddressProvider

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.lcd = lcd
    this.addressProvider = addressProvider
  }

  depositStable(market: AnchorMarkets, amount: string): Operation {
    return new OperationImpl(
      fabricateMarketDepositStableCoin,
      { market, amount },
      this.addressProvider
    )
  }

  withdrawStable(market: AnchorMarkets, amount: string): Operation {
    return new OperationImpl(
      fabricateMarketRedeemStable,
      { market, amount },
      this.addressProvider
    )
  }

  async getTotalDeposit(market: AnchorMarkets, address: string): Promise<string> {
    const epochState = await queryMarketEpochState({ lcd: this.lcd, market })(this.addressProvider)
    const userATerraBalance = await queryTokenBalance({
      lcd: this.lcd,
      address,
      token_address: this.addressProvider.aTerra(market)
    })(this.addressProvider)

    return new Int(new Dec(epochState.exchange_rate).mul(userATerraBalance.balance)).toString()
  }

  async getAPY(market: AnchorMarkets): Promise<number> {
    const epochState = await queryOverseerEpochState({ lcd: this.lcd, market })(this.addressProvider)
    return new Dec(epochState.deposit_rate).mul(BLOCKS_PER_YEAR).toNumber()
  }
}
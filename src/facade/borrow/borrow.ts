import { Dec, LCDClient } from '@terra-money/terra.js';
import {
  AddressProvider,
  MARKET_DENOMS,
  COLLATERAL_DENOMS,
} from '../../address-provider';
import {
  fabricateMarketBorrow,
  fabricateMarketRepay,
  fabricateProvideCollateral,
  fabricateRedeemCollateral,
} from '../../fabricators';
import {
  queryCustodyBorrower,
  queryMarketLoanAmount,
  queryOraclePrices,
  queryOverseerWhitelist,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';

interface UserCollateral {
  collateral: string;
  balance: string;
}

export class Borrow {
  lcd!: LCDClient;
  addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.lcd = lcd;
    this.addressProvider = addressProvider;
  }

  borrow(market: MARKET_DENOMS, amount: string): Operation {
    return new OperationImpl(
      fabricateMarketBorrow,
      { market, amount },
      this.addressProvider,
    );
  }

  repay(market: MARKET_DENOMS, amount: string): Operation {
    return new OperationImpl(
      fabricateMarketRepay,
      { market, amount },
      this.addressProvider,
    );
  }

  provideCollateral(
    market: MARKET_DENOMS,
    collateral: COLLATERAL_DENOMS,
    amount: string,
  ): Operation {
    return new OperationImpl(
      fabricateProvideCollateral,
      { market, collateral, amount },
      this.addressProvider,
    );
  }

  withdrawCollateral(
    market: MARKET_DENOMS,
    collateral: COLLATERAL_DENOMS,
    amount: string,
  ): Operation {
    return new OperationImpl(
      fabricateRedeemCollateral,
      { market, collateral, amount },
      this.addressProvider,
    );
  }

  async getCollateralValue(
    market: MARKET_DENOMS,
    address: string,
  ): Promise<string> {
    // only bLuna is supported now, and the below requests are only about bLuna
    const oraclePrice = await queryOraclePrices({ lcd: this.lcd, limit: 30 })(
      this.addressProvider,
    );
    const COLLATERAL_DENOMS = await this.getCOLLATERAL_DENOMS(market, address);

    const total = COLLATERAL_DENOMS.reduce((sum, collateral) => {
      const collateralPrice = oraclePrice.prices.find(
        (p) => p.asset === collateral.collateral,
      );
      if (!collateralPrice || new Dec(collateralPrice.price).eq(0)) {
        return sum;
      }

      return sum.add(new Dec(collateral.balance).mul(collateralPrice.price));
    }, new Dec(0));

    return total.toString();
  }

  async getCOLLATERAL_DENOMS(
    market: MARKET_DENOMS,
    address: string,
  ): Promise<UserCollateral[]> {
    // get user balances of all COLLATERAL_DENOMS
    const whitelistedCOLLATERAL_DENOMS = await queryOverseerWhitelist({
      lcd: this.lcd,
      market,
    })(this.addressProvider);
    const COLLATERAL_DENOMS = await Promise.all(
      whitelistedCOLLATERAL_DENOMS.elems
        .map(async (whitelist) => {
          const userBalance = await queryCustodyBorrower({
            lcd: this.lcd,
            address,
            market,
            custody: whitelist.collateral_token,
          })(this.addressProvider);

          if (userBalance.balance === '0') {
            return null;
          }

          return {
            collateral: whitelist.collateral_token,
            balance: userBalance.balance,
          };
        })
        .filter(Boolean),
    );

    return COLLATERAL_DENOMS as UserCollateral[];
  }

  async getBorrowedValue(
    market: MARKET_DENOMS,
    address: string,
  ): Promise<string> {
    const { block } = await this.lcd.tendermint.blockInfo();
    const loanAmount = await queryMarketLoanAmount({
      lcd: this.lcd,
      market,
      borrower: address,
      blockHeight: +block.header.height,
    })(this.addressProvider);

    return loanAmount.loanAmount;
  }
}

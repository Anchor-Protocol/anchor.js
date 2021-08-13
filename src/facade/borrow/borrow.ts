import { Dec, LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  fabricateMarketBorrow,
  fabricateMarketRepay,
  fabricateProvideCollateral,
  fabricateRedeemCollateral,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import {
  queryCustodyBorrower,
  queryMarketBorrowerInfo,
  queryOraclePrices,
  queryOverseerBorrowLimit,
  queryOverseerWhitelist,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';

interface UserCollateral {
  collateral: string;
  balance: string;
}

export type BorrowBorrowOption = OmitAddress<
  OptionType<typeof fabricateMarketBorrow>
>;
export type BorrowRepayOption = OmitAddress<
  OptionType<typeof fabricateMarketRepay>
>;
export type BorrowProvideCollateralOption = OmitAddress<
  OptionType<typeof fabricateProvideCollateral>
>;
export type BorrowWithdrawCollateralOption = OmitAddress<
  OptionType<typeof fabricateRedeemCollateral>
>;

export interface BorrowQueriesOptions {
  market: MARKET_DENOMS;
  address: string;
}

export class Borrow {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  borrow(borrowOption: BorrowBorrowOption): Operation {
    return new OperationImpl(
      fabricateMarketBorrow,
      borrowOption,
      this._addressProvider,
    );
  }

  repay(repayOption: BorrowRepayOption): Operation {
    return new OperationImpl(
      fabricateMarketRepay,
      repayOption,
      this._addressProvider,
    );
  }

  provideCollateral(
    provideCollateralOptions: BorrowProvideCollateralOption,
  ): Operation {
    return new OperationImpl(
      fabricateProvideCollateral,
      provideCollateralOptions,
      this._addressProvider,
    );
  }

  withdrawCollateral(
    withdrawCollateralOption: BorrowWithdrawCollateralOption,
  ): Operation {
    return new OperationImpl(
      fabricateRedeemCollateral,
      withdrawCollateralOption,
      this._addressProvider,
    );
  }

  async getCollateralValue(
    getCollateralValueOption: BorrowQueriesOptions,
  ): Promise<string> {
    // only bLuna is supported now, and the below requests are only about bLuna
    const oraclePrice = await queryOraclePrices({ lcd: this._lcd, limit: 30 })(
      this._addressProvider,
    );
    const collaterals = await this.getCollaterals(getCollateralValueOption);

    if (collaterals.length === 1 && collaterals[0] === null) {
      return new Dec(0).toString();
    }

    const total = collaterals.reduce((sum, collateral) => {
      const collateralPrice = oraclePrice.prices.find(
        (p) => p.asset === collateral.collateral,
      );
      if (!collateralPrice || new Dec(collateralPrice.price).eq(0)) {
        return sum;
      }

      return sum.add(new Dec(collateral.balance).mul(collateralPrice.price));
    }, new Dec(0));

    return total.div(1000000).toString();
  }

  async getCollaterals(
    getCollateralsOption: BorrowQueriesOptions,
  ): Promise<UserCollateral[]> {
    // get user balances of all COLLATERAL_DENOMS
    const whitelistedCollaterals = await queryOverseerWhitelist({
      lcd: this._lcd,
      ...getCollateralsOption,
    })(this._addressProvider);
    const collateralDenoms = await Promise.all(
      whitelistedCollaterals.elems
        .map(async (whitelist) => {
          const userBalance = await queryCustodyBorrower({
            lcd: this._lcd,
            ...getCollateralsOption,
            custody: getCollateralsOption.market,
          })(this._addressProvider);

          if (userBalance.balance === '0') {
            return null;
          }

          return {
            collateral: whitelist.collateral_token,
            balance: new Dec(userBalance.balance).toString(),
          };
        })
        .filter(Boolean),
    );

    return collateralDenoms as UserCollateral[];
  }

  async getBorrowedValue(
    getBorrowedValueOption: BorrowQueriesOptions,
  ): Promise<string> {
    const { block } = await this._lcd.tendermint.blockInfo();
    const loanAmount = await queryMarketBorrowerInfo({
      lcd: this._lcd,
      market: getBorrowedValueOption.market,
      borrower: getBorrowedValueOption.address,
      block_height: +block.header.height,
    })(this._addressProvider);

    return new Dec(loanAmount.loan_amount).div(1000000).toString();
  }

  async getBorrowLimit(
    getBorrowLimitOption: BorrowQueriesOptions,
  ): Promise<string> {
    const { block } = await this._lcd.tendermint.blockInfo();
    const borrowLimitResponse = await queryOverseerBorrowLimit({
      lcd: this._lcd,
      overseer: getBorrowLimitOption.market,
      borrower: getBorrowLimitOption.address,
      block_time: +block.header.height,
    })(this._addressProvider);
    return new Dec(borrowLimitResponse.borrow_limit).div(1000000).toString();
  }
}

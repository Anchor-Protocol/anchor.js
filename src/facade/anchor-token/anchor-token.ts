import { LCDClient } from "@terra-money/terra.js";
import { AddressProvider } from "../../address-provider";
import { Expire, fabricateMarketClaimRewards, fabricateStakingBond, fabricateStakingUnbond, fabricateStakingWithdraw, fabricateTerraswapProvideLiquidityANC, fabricateTerraswapSwapANC, fabricateTerraswapSwapUSTANC, fabricateTerraswapWithdrawLiquidityANC } from "../../fabricators";
import { queryStakingStaker, queryTokenBalance } from "../../queries";
import { Operation, OperationImpl } from "../operation";
import { AnchorMarkets, SlippageToleranceConfig } from "../types";

export class AnchorToken {
  lcd!: LCDClient
  addressProvider!: AddressProvider

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.lcd = lcd
    this.addressProvider = addressProvider
  }

  claimUSTBorrowRewards(market: AnchorMarkets, to?: string): Operation {
    return new OperationImpl(
      fabricateMarketClaimRewards,
      { market, to },
      this.addressProvider
    )
  }

  claimLPRewards(): Operation {
    return new OperationImpl(
      fabricateStakingWithdraw,
      { },
      this.addressProvider
    )
  }

  buyANC(ustAmount: string, slippageControl?: SlippageToleranceConfig, to?: string): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapUSTANC,
      { amount: ustAmount, denom: 'uusd', belief_price: slippageControl?.beliefPrice, max_spread: slippageControl?.maxSpread, to },
      this.addressProvider
    )
  }

  sellANC(tokenAmount: string, slippageControl?: SlippageToleranceConfig, to?: string): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapANC,
      {
        amount: tokenAmount,
        to,
        belief_price: slippageControl?.beliefPrice,
        max_spread: slippageControl?.maxSpread,
      },
      this.addressProvider
    )
  }

  provideLiquidity(uusdAmount: string, ancAmount: string, slippageTolerance?: string, expires?: Expire): Operation { 
    return new OperationImpl(
      fabricateTerraswapProvideLiquidityANC,
      {
        token_amount: ancAmount,
        native_amount: uusdAmount,
        quote: 'uusd',
        slippage_tolerance: slippageTolerance,
        expires
      },
      this.addressProvider
    )
  }

  withdrawLiquidity(tokenAmount: string): Operation {
    return new OperationImpl(
      fabricateTerraswapWithdrawLiquidityANC,
      {
        amount: tokenAmount
      },
      this.addressProvider,
    )
  }

  stakeLP(lpTokenAmount: string): Operation {
    return new OperationImpl(
      fabricateStakingBond,
      {
        amount: lpTokenAmount 
      },
      this.addressProvider
    )
  }

  unstakeLP(unstakeAmount: string): Operation {
    return new OperationImpl(
      fabricateStakingUnbond,
      {
        amount: unstakeAmount
      },
      this.addressProvider
    )
  }

  async getBalance(address: string): Promise<string> {
    const balance = await queryTokenBalance({ lcd: this.lcd, address, token_address: this.addressProvider.ANC() })(this.addressProvider)
    return balance.balance
  }

  async getLPBalance(address: string): Promise<string> {
    const balance = await queryTokenBalance({ lcd: this.lcd, address, token_address: this.addressProvider.terraswapAncUstLPToken() })(this.addressProvider)
    return balance.balance
  }

  async getProvidedLP(address: string): Promise<string> {
    const provided = await queryStakingStaker({ lcd: this.lcd, staker: address })(this.addressProvider)
    return provided.bond_amount
  }
}
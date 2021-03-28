import { Dec, LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
  Expire,
  fabricateGovCastVote,
  fabricateGovCreatePoll,
  fabricateGovEndPoll,
  fabricateGovExecutePoll,
  fabricateGovExpirePoll,
  fabricateGovStakeVoting,
  fabricateMarketClaimRewards,
  fabricateStakingBond,
  fabricateStakingUnbond,
  fabricateStakingWithdraw,
  fabricateTerraswapProvideLiquidityANC,
  fabricateTerraswapSwapANC,
  fabricateTerraswapSwapUSTANC,
  fabricateTerraswapWithdrawLiquidityANC,
  OmitAddress,
  OptionType,
  VoteOption,
} from '../../fabricators';
import { queryStakingStaker, queryTokenBalance } from '../../queries';
import { queryTerraswapPool } from '../../queries/terraswap/pool';
import { Operation, OperationImpl } from '../operation';
import { SlippageToleranceConfig } from '../types';

// type exports
export type GovCreatePollOption = OptionType<typeof fabricateGovCreatePoll>

export class AnchorToken {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  claimUSTBorrowRewards(market: MARKET_DENOMS, to?: string): Operation {
    return new OperationImpl(
      fabricateMarketClaimRewards,
      { market, to },
      this._addressProvider,
    );
  }

  claimLPRewards(): Operation {
    return new OperationImpl(
      fabricateStakingWithdraw,
      {},
      this._addressProvider,
    );
  }

  buyANC(
    ustAmount: string,
    slippageControl?: SlippageToleranceConfig,
    to?: string,
  ): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapUSTANC,
      {
        amount: ustAmount,
        denom: MARKET_DENOMS.UUSD,
        belief_price: slippageControl?.beliefPrice,
        max_spread: slippageControl?.maxSpread,
        to,
      },
      this._addressProvider,
    );
  }

  sellANC(
    tokenAmount: string,
    slippageControl?: SlippageToleranceConfig,
    to?: string,
  ): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapANC,
      {
        amount: tokenAmount,
        to,
        belief_price: slippageControl?.beliefPrice,
        max_spread: slippageControl?.maxSpread,
      },
      this._addressProvider,
    );
  }

  provideLiquidity(
    uusdAmount: string,
    ancAmount: string,
    slippageTolerance?: string,
    expires?: Expire,
  ): Operation {
    return new OperationImpl(
      fabricateTerraswapProvideLiquidityANC,
      {
        token_amount: ancAmount,
        native_amount: uusdAmount,
        quote: 'uusd',
        slippage_tolerance: slippageTolerance,
        expires,
      },
      this._addressProvider,
    );
  }

  withdrawLiquidity(tokenAmount: string): Operation {
    return new OperationImpl(
      fabricateTerraswapWithdrawLiquidityANC,
      {
        amount: tokenAmount,
      },
      this._addressProvider,
    );
  }

  stakeLP(lpTokenAmount: string): Operation {
    return new OperationImpl(
      fabricateStakingBond,
      {
        amount: lpTokenAmount,
      },
      this._addressProvider,
    );
  }

  unstakeLP(unstakeAmount: string): Operation {
    return new OperationImpl(
      fabricateStakingUnbond,
      {
        amount: unstakeAmount,
      },
      this._addressProvider,
    );
  }

  async getBalance(address: string): Promise<string> {
    const balance = await queryTokenBalance({
      lcd: this._lcd,
      address,
      token_address: this._addressProvider.ANC(),
    })(this._addressProvider);
    return new Dec(balance.balance).div(1000000).toString();
  }

  async getLPBalance(address: string): Promise<string> {
    const balance = await queryTokenBalance({
      lcd: this._lcd,
      address,
      token_address: this._addressProvider.terraswapAncUstLPToken(),
    })(this._addressProvider);
    return new Dec(balance.balance).div(1000000).toString();
  }

  async getProvidedLP(address: string): Promise<string> {
    const provided = await queryStakingStaker({
      lcd: this._lcd,
      staker: address,
    })(this._addressProvider);
    return new Dec(provided.bond_amount).div(1000000).toString();
  }

  async getANCPrice(): Promise<string> {
    const poolInfo = await queryTerraswapPool({
      lcd: this._lcd,
      pair_contract_address: this._addressProvider.terraswapAncUstPair(),
    })(this._addressProvider);
    const anc = poolInfo.assets[0].amount;
    const uusd = poolInfo.assets[1].amount;

    return new Dec(uusd).div(anc).toString();
  }

  // gov related
  createPoll(createPollOption: OmitAddress<GovCreatePollOption>): Operation {
    return new OperationImpl(
      fabricateGovCreatePoll,
      createPollOption,
      this._addressProvider
    )
  }

  castVote(poll_id: number, vote: VoteOption, amount: string): Operation {
    return new OperationImpl(
      fabricateGovCastVote,
      {
        poll_id,
        vote,
        amount
      },
      this._addressProvider
    )
  }

  endPoll(poll_id: number): Operation {
    return new OperationImpl(
      fabricateGovEndPoll,
      {
        poll_id,
      },
      this._addressProvider
    )
  }

  executePoll(poll_id: number): Operation {
    return new OperationImpl(
      fabricateGovExecutePoll,
      {
        poll_id
      },
      this._addressProvider
    )

  }

  expirePoll(poll_id: number): Operation {
    return new OperationImpl(
      fabricateGovExpirePoll,
      {
        poll_id
      },
      this._addressProvider
    )
  }

  stakeVotingTokens(amount: string): Operation {
    return new OperationImpl(
      fabricateGovStakeVoting,
      {
        amount
      },
      this._addressProvider
    )
  }

  async getGovState() {}
  async getStaker() {}
  async getPoll() {}
  async getPolls() {}
}

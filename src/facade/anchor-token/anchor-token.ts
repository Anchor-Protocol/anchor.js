import { Dec, LCDClient } from '@terra-money/terra.js';
import { AddressProvider, MARKET_DENOMS } from '../../address-provider';
import {
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
  OmitLCD,
  OptionType,
} from '../../fabricators';
import {
  queryGovPoll,
  queryGovPolls,
  queryGovStaker,
  queryGovState,
  queryStakingStaker,
  queryTokenBalance,
} from '../../queries';
import { queryTerraswapPool } from '../../queries/terraswap/pool';
import { QueryOptionType, QueryResponseType } from '../../queries/types';
import { Operation, OperationImpl } from '../operation';
import { SlippageToleranceConfig } from '../types';

// type exports
export type AnchorTokenClaimUSTBorrowRewardsOption = OmitAddress<
  OptionType<typeof fabricateMarketClaimRewards>
>;
export type AnchorTokenGovCreatePollOption = OmitAddress<
  OptionType<typeof fabricateGovCreatePoll>
>;
export type AnchorTokenGovCastVoteOption = OmitAddress<
  OptionType<typeof fabricateGovCastVote>
>;
export type AnchorTokenGovEndPollOption = OmitAddress<
  OptionType<typeof fabricateGovEndPoll>
>;
export type AnchorTokenGovExecutePollOption = OmitAddress<
  OptionType<typeof fabricateGovExecutePoll>
>;
export type AnchorTokenGovExpirePollOption = OmitAddress<
  OptionType<typeof fabricateGovExpirePoll>
>;
export type AnchorTokenStakeVotingTokensOption = OmitAddress<
  OptionType<typeof fabricateGovStakeVoting>
>;
export type AnchorTokenProvideLiquidityOption = OmitAddress<
  Omit<OptionType<typeof fabricateTerraswapProvideLiquidityANC>, 'quote'>
>;
export type AnchorTokenGetStakerOption = OmitLCD<
  QueryOptionType<typeof queryGovStaker>
>;
export type AnchorTokenGetPollOption = OmitLCD<
  QueryOptionType<typeof queryGovPoll>
>;
export type AnchorTokenGetPollsOption = OmitLCD<
  QueryOptionType<typeof queryGovPolls>
>;

export class AnchorToken {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  claimUSTBorrowRewards(
    option: AnchorTokenClaimUSTBorrowRewardsOption,
  ): Operation {
    return new OperationImpl(
      fabricateMarketClaimRewards,
      option,
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

  provideLiquidity(option: AnchorTokenProvideLiquidityOption): Operation {
    return new OperationImpl(
      fabricateTerraswapProvideLiquidityANC,
      { ...option, quote: 'uusd' },
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
  createPoll(createPollOption: AnchorTokenGovCreatePollOption): Operation {
    return new OperationImpl(
      fabricateGovCreatePoll,
      createPollOption,
      this._addressProvider,
    );
  }

  castVote(castVoteOption: AnchorTokenGovCastVoteOption): Operation {
    return new OperationImpl(
      fabricateGovCastVote,
      castVoteOption,
      this._addressProvider,
    );
  }

  endPoll(endPollOption: AnchorTokenGovEndPollOption): Operation {
    return new OperationImpl(
      fabricateGovEndPoll,
      endPollOption,
      this._addressProvider,
    );
  }

  executePoll(executePollOption: AnchorTokenGovExecutePollOption): Operation {
    return new OperationImpl(
      fabricateGovExecutePoll,
      executePollOption,
      this._addressProvider,
    );
  }

  expirePoll(expirePollOption: AnchorTokenGovExpirePollOption): Operation {
    return new OperationImpl(
      fabricateGovExpirePoll,
      expirePollOption,
      this._addressProvider,
    );
  }

  stakeVotingTokens(
    stakeVotingTokensOption: AnchorTokenStakeVotingTokensOption,
  ): Operation {
    return new OperationImpl(
      fabricateGovStakeVoting,
      stakeVotingTokensOption,
      this._addressProvider,
    );
  }

  async getGovState(): QueryResponseType<typeof queryGovState> {
    return queryGovState({ lcd: this._lcd })(this._addressProvider);
  }

  async getStaker(
    option: AnchorTokenGetStakerOption,
  ): QueryResponseType<typeof queryGovStaker> {
    return queryGovStaker({ lcd: this._lcd, ...option })(this._addressProvider);
  }

  async getPoll(
    option: AnchorTokenGetPollOption,
  ): QueryResponseType<typeof queryGovPoll> {
    return queryGovPoll({ lcd: this._lcd, ...option })(this._addressProvider);
  }

  async getPolls(
    option: AnchorTokenGetPollsOption,
  ): QueryResponseType<typeof queryGovPolls> {
    return queryGovPolls({ lcd: this._lcd, ...option })(this._addressProvider);
  }
}

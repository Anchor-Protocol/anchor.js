import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';
import {
  fabricatebAssetBond,
  fabricatebAssetClaimRewards,
  fabricatebAssetUnbond,
  fabricatebAssetWithdrawUnbonded,
  fabricateTerraswapSwapbLuna,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import {
  queryHubUnbond,
  queryRewardHolder,
  queryRewardState,
  UnbondResponse,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';

export type BlunaMintOption = OptionType<typeof fabricatebAssetBond>;
export type BlunaBurnOption = OptionType<typeof fabricatebAssetUnbond>;
export type BlunaInstantBurnOption = OptionType<
  typeof fabricateTerraswapSwapbLuna
>;
export type BlunaClaimRewardsOption = OptionType<
  typeof fabricatebAssetClaimRewards
>;

export interface BlunaQueriesOption {
  address: string;
}

export class BLuna {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  mint(mintOption: OmitAddress<BlunaMintOption>): Operation {
    return new OperationImpl(
      fabricatebAssetBond,
      mintOption,
      this._addressProvider,
    );
  }

  burn(burnOption: OmitAddress<BlunaBurnOption>): Operation {
    return new OperationImpl(
      fabricatebAssetUnbond,
      burnOption,
      this._addressProvider,
    );
  }

  instantBurn(
    instantiateBurnOption: OmitAddress<BlunaInstantBurnOption>,
  ): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapbLuna,
      instantiateBurnOption,
      this._addressProvider,
    );
  }

  withdraw(): Operation {
    return new OperationImpl(
      fabricatebAssetWithdrawUnbonded,
      {},
      this._addressProvider,
    );
  }

  claim(claimOptions: OmitAddress<BlunaClaimRewardsOption>): Operation {
    return new OperationImpl(
      fabricatebAssetClaimRewards,
      claimOptions,
      this._addressProvider,
    );
  }

  async getUnbondRequests(
    getUnbondRequestsOption: BlunaQueriesOption,
  ): Promise<UnbondResponse> {
    return queryHubUnbond({ lcd: this._lcd, ...getUnbondRequestsOption })(
      this._addressProvider,
    );
  }

  async getClaimableRewards(
    getClaimableRewardsOption: BlunaQueriesOption,
  ): Promise<string> {
    const holder = await queryRewardHolder({
      lcd: this._lcd,
      ...getClaimableRewardsOption,
    })(this._addressProvider);
    const rewardState = await queryRewardState({ lcd: this._lcd })(
      this._addressProvider,
    );

    return new Int(
      new Int(holder.balance).mul(
        new Dec(rewardState.global_index).sub(new Dec(holder.index)),
      ),
    )
      .add(new Int(holder.pending_rewards))
      .div(1000000)
      .toString();
  }
}

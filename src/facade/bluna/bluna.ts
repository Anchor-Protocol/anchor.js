import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';
import {
  fabricatebAssetBond,
  fabricatebAssetBurn,
  fabricatebAssetClaimRewards,
  fabricatebAssetWithdrawUnbonded,
  fabricateTerraswapSwapbLuna,
} from '../../fabricators';
import {
  queryHubUnbond,
  queryRewardHolder,
  queryRewardState,
  UnbondResponse,
} from '../../queries';
import { Operation, OperationImpl } from '../operation';

interface SlippageToleranceConfig {
  beliefPrice: string;
  maxSpread: string;
}

export class BLuna {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  mint(amount: string, validator: string): Operation {
    return new OperationImpl(
      fabricatebAssetBond,
      { amount, validator },
      this._addressProvider,
    );
  }

  burn(bLunaAmount: string): Operation {
    return new OperationImpl(
      fabricatebAssetBurn,
      { amount: bLunaAmount },
      this._addressProvider,
    );
  }

  instantBurn(
    bLunaAmount: string,
    slippageTolerance?: SlippageToleranceConfig,
  ): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapbLuna,
      {
        amount: bLunaAmount,
        belief_price: slippageTolerance?.beliefPrice,
        max_spread: slippageTolerance?.maxSpread,
      },
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

  claim(recipient?: string): Operation {
    return new OperationImpl(
      fabricatebAssetClaimRewards,
      { recipient },
      this._addressProvider,
    );
  }

  async getUnbondRequests(address: string): Promise<UnbondResponse> {
    return queryHubUnbond({ lcd: this._lcd, address })(this._addressProvider);
  }

  async getClaimableRewards(address: string): Promise<string> {
    const holder = await queryRewardHolder({ lcd: this._lcd, address })(
      this._addressProvider,
    );
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

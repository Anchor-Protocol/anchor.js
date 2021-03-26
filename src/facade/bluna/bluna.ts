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
  lcd!: LCDClient;
  addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.lcd = lcd;
    this.addressProvider = addressProvider;
  }

  mint(amount: string, validator: string): Operation {
    return new OperationImpl(
      fabricatebAssetBond,
      { amount, validator },
      this.addressProvider,
    );
  }

  burn(bLunaAmount: string): Operation {
    return new OperationImpl(
      fabricatebAssetBurn,
      { amount: bLunaAmount },
      this.addressProvider,
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
      this.addressProvider,
    );
  }

  withdraw(): Operation {
    return new OperationImpl(
      fabricatebAssetWithdrawUnbonded,
      {},
      this.addressProvider,
    );
  }

  claim(recipient?: string): Operation {
    return new OperationImpl(
      fabricatebAssetClaimRewards,
      { recipient },
      this.addressProvider,
    );
  }

  async getUnbondRequests(address: string): Promise<UnbondResponse> {
    return await queryHubUnbond({ lcd: this.lcd, address })(
      this.addressProvider,
    );
  }

  async getClaimableRewards(address: string): Promise<string> {
    const holder = await queryRewardHolder({ lcd: this.lcd, address })(
      this.addressProvider,
    );
    const rewardState = await queryRewardState({ lcd: this.lcd })(
      this.addressProvider,
    );

    return new Int(
      new Int(holder.balance).mul(
        new Dec(rewardState.global_index).sub(new Dec(holder.index)),
      ),
    )
      .add(new Int(holder.pending_rewards))
      .toString();
  }
}

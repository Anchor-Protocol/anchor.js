import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider } from '../../address-provider';
import {
  fabricatebAssetClaimRewards,
  fabricatebAssetConvertToWormhole,
  fabricatebAssetConvertFromWormhole,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import { querybAssetRewardHolder, querybAssetRewardState } from '../../queries';
import { Operation, OperationImpl } from '../operation';

export type BAssetClaimRewardsOption = OptionType<
  typeof fabricatebAssetClaimRewards
>;
export type BAssetConvertToWormholeOption = OptionType<
  typeof fabricatebAssetConvertToWormhole
>;
export type BAssetConvertFromWormholeOption = OptionType<
  typeof fabricatebAssetConvertFromWormhole
>;

export interface BAssetQueriesOption {
  address: string;
}

export class BAsset {
  private readonly _lcd!: LCDClient;
  private readonly _addressProvider!: BAssetAddressProvider;

  constructor(lcd: LCDClient, addressProvider: BAssetAddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  convertToWormhole(
    convertOptions: OmitAddress<BAssetConvertToWormholeOption>,
  ): Operation {
    return new OperationImpl(
      fabricatebAssetConvertToWormhole,
      convertOptions,
      this._addressProvider,
    );
  }

  convertFromWormhole(
    convertOptions: OmitAddress<BAssetConvertFromWormholeOption>,
  ): Operation {
    return new OperationImpl(
      fabricatebAssetConvertFromWormhole,
      convertOptions,
      this._addressProvider,
    );
  }

  claim(claimOptions: OmitAddress<BAssetClaimRewardsOption>): Operation {
    return new OperationImpl(
      fabricatebAssetClaimRewards,
      claimOptions,
      this._addressProvider,
    );
  }

  async getClaimableRewards(
    getClaimableRewardsOption: BAssetQueriesOption,
  ): Promise<string> {
    const holder = await querybAssetRewardHolder({
      lcd: this._lcd,
      ...getClaimableRewardsOption,
    })(this._addressProvider);
    const rewardState = await querybAssetRewardState({
      lcd: this._lcd,
    })(this._addressProvider);

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

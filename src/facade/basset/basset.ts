import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';
import {
  fabricatebAssetClaimRewards,
  fabricatebAssetConvertToWormhole,
  fabricatebAssetConvertFromWormhole,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import { querybAssetRewardHolder, querybAssetRewardState } from '../../queries';
import { Operation, OperationImpl } from '../operation';

type OmitbAsset<T> = Omit<T, 'bAsset'>;

export type BAssetClaimRewardsOption = OmitbAsset<
  OptionType<typeof fabricatebAssetClaimRewards>
>;
export type BAssetConvertToWormholeOption = OmitbAsset<
  OptionType<typeof fabricatebAssetConvertToWormhole>
>;
export type BAssetConvertFromWormholeOption = OmitbAsset<
  OptionType<typeof fabricatebAssetConvertFromWormhole>
>;

export interface BAssetQueriesOption {
  address: string;
}

export class BAsset {
  private readonly _lcd!: LCDClient;
  private readonly _addressProvider!: AddressProvider;
  private readonly _bAssetAddressProvider!: BAssetAddressProvider;

  constructor(
    lcd: LCDClient,
    addressProvider: AddressProvider,
    bAssetAddressProvider: BAssetAddressProvider,
  ) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
    this._bAssetAddressProvider = bAssetAddressProvider;
  }

  addresses(): BAssetAddressProvider {
    return this._bAssetAddressProvider;
  }

  convertToWormhole(
    convertOptions: OmitAddress<BAssetConvertToWormholeOption>,
  ): Operation {
    return new OperationImpl(
      fabricatebAssetConvertToWormhole,
      { ...convertOptions, bAsset: this._bAssetAddressProvider },
      this._addressProvider,
    );
  }

  convertFromWormhole(
    convertOptions: OmitAddress<BAssetConvertFromWormholeOption>,
  ): Operation {
    return new OperationImpl(
      fabricatebAssetConvertFromWormhole,
      { ...convertOptions, bAsset: this._bAssetAddressProvider },
      this._addressProvider,
    );
  }

  claim(claimOptions: OmitAddress<BAssetClaimRewardsOption>): Operation {
    return new OperationImpl(
      fabricatebAssetClaimRewards,
      { ...claimOptions, bAsset: this._bAssetAddressProvider },
      this._addressProvider,
    );
  }

  async getClaimableRewards(
    getClaimableRewardsOption: BAssetQueriesOption,
  ): Promise<string> {
    const holder = await querybAssetRewardHolder({
      lcd: this._lcd,
      bAsset: this._bAssetAddressProvider,
      ...getClaimableRewardsOption,
    })(this._addressProvider);
    const rewardState = await querybAssetRewardState({
      lcd: this._lcd,
      bAsset: this._bAssetAddressProvider,
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

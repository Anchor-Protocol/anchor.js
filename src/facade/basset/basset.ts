import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { BAssetAddressProvider, AddressProvider } from '../../address-provider';
import {
  fabricatebAssetClaimRewards,
  fabricatebAssetConvertAnchorToWormhole,
  fabricatebAssetConvertWormholeToAnchor,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import { querybAssetRewardHolder, querybAssetRewardState } from '../../queries';
import { Operation, OperationImpl } from '../operation';

type OmitbAsset<T> = Omit<T, 'bAsset'>;

export type BAssetClaimRewardsOption = OmitbAsset<
  OptionType<typeof fabricatebAssetClaimRewards>
>;

export type BAssetConvertAnchorToWormholeOption = OmitbAsset<
  OptionType<typeof fabricatebAssetConvertAnchorToWormhole>
>;

export type BAssetConvertWormholeToAnchorOption = OmitbAsset<
  OptionType<typeof fabricatebAssetConvertWormholeToAnchor>
>;

export interface BAssetQueriesOption {
  address: string;
}

interface BAssetOptions {
  lcd: LCDClient;
  addressProvider: AddressProvider;
  bAssetAddressProvider: BAssetAddressProvider;
  wormhole?: {
    decimals: number;
  };
}

export class BAsset {
  private readonly _lcd!: LCDClient;
  private readonly _addressProvider!: AddressProvider;
  private readonly _wormholeDecimals?: number;
  private readonly _bAssetAddressProvider!: BAssetAddressProvider;

  constructor(options: BAssetOptions) {
    this._lcd = options.lcd;
    this._addressProvider = options.addressProvider;
    this._bAssetAddressProvider = options.bAssetAddressProvider;
    this._wormholeDecimals = options.wormhole?.decimals;
  }

  addresses(): BAssetAddressProvider {
    return this._bAssetAddressProvider;
  }

  convertToWormhole(
    convertOptions: OmitAddress<BAssetConvertAnchorToWormholeOption>,
  ): Operation {
    return new OperationImpl(
      fabricatebAssetConvertAnchorToWormhole,
      { ...convertOptions, bAsset: this._bAssetAddressProvider },
      this._addressProvider,
    );
  }

  convertFromWormhole(
    convertOptions: Omit<
      OmitAddress<BAssetConvertWormholeToAnchorOption>,
      'wormholeTokenDecimals'
    >,
  ): Operation {
    if (this._wormholeDecimals === undefined) {
      throw new Error('The required Wormhole information was not present.');
    }
    return new OperationImpl(
      fabricatebAssetConvertWormholeToAnchor,
      {
        ...convertOptions,
        wormholeTokenDecimals: this._wormholeDecimals,
        bAsset: this._bAssetAddressProvider,
      },
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

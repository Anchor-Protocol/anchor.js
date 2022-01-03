export interface BAssetAddressMap {
  token: string;
  custody: string;
  reward: string;
  converter: string;
  wormhole: string;
}

export interface BAssetAddressProvider {
  token(): string;

  reward(): string;

  converter(): string;

  custody(): string;

  wormhole(): string;
}

export class BAssetAddressProviderImpl implements BAssetAddressProvider {
  private readonly data: BAssetAddressMap;

  constructor(data: BAssetAddressMap) {
    this.data = data;
  }

  token(): string {
    return this.data.token;
  }

  reward(): string {
    return this.data.reward;
  }

  converter(): string {
    return this.data.converter;
  }

  custody(): string {
    return this.data.custody;
  }

  wormhole(): string {
    return this.data.wormhole;
  }
}

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

export const bAssetColumbus5 = {
  bLUNA: {
    token: 'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp',
    reward: 'terra17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0',
    converter: '',
    custody: 'terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn',
  },
  bETH: {
    reward: 'terra1939tzfn4hn960ychpcsjshu8jds3zdwlp8jed9',
    token: 'terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun',
    converter: '',
    custody: 'terra10cxuzggyvvv44magvrh3thpdnk9cmlgk93gmx2',
    wormhole: '',
  },
};

export const bAssetBombay12 = {
  bLUNA: {
    token: 'terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x',
    reward: 'terra1ac24j6pdxh53czqyrkr6ygphdeftg7u3958tl2',
    converter: '',
    custody: 'terra1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p',
    wormhole: '',
  },
  bETH: {
    token: 'terra19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l',
    reward: 'terra1ja3snkedk4t0zp7z3ljd064hcln8dsv5x004na',
    converter: 'terra1g68g7l3xkpm4hvadrqrfc53vtnfhl4dlnjm45u',
    custody: 'terra1j6fey5tl70k9fvrv7mea7ahfr8u2yv7l23w5e6',
    wormhole: 'terra1d74gfj8gs6rskcuu80x3deus7gut77udhdajv7',
  },
};

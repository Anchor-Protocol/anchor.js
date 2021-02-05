import { AddressProvider } from './provider';

interface JsonData {
  bLunaHub: string;
  bAssetToken: string;
  bAssetReward: string;
  mmInterest: string;
  mmOracle: string;
  mmMarket: string;
  mmOverseer: string;
  mmCustody: string;
  mmLiquidation: string;
  anchorToken: string;
  terraswapFactory: string;
  blunaBurnPair: string;
  blunaBurnuluna: string;
}

export class AddressProviderFromJson implements AddressProvider {
  constructor(private data: JsonData) {}

  bAssetReward(): string {
    return this.data.bAssetReward;
  }

  bAssetHub(): string {
    return this.data.bLunaHub;
  }

  bAssetToken(): string {
    return this.data.bAssetToken;
  }

  market(): string {
    return this.data.mmMarket;
  }

  custody(): string {
    return this.data.mmCustody;
  }

  overseer(): string {
    return this.data.mmOverseer;
  }

  aToken(): string {
    return this.data.anchorToken;
  }

  oracle(): string {
    return this.data.mmOracle;
  }

  interest(): string {
    return this.data.mmInterest;
  }

  liquidation(): string {
    return this.data.mmLiquidation;
  }

  terraswapFactory(): string {
    return this.data.terraswapFactory;
  }

  blunaBurnPair(): string {
    return this.data.blunaBurnPair;
  }

  blunaBurn(): string {
    return this.data.blunaBurnuluna;
  }
}

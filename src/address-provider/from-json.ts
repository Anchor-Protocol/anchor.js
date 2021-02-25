import { AddressProvider } from "./provider";

interface JsonData {
  bLunaHub: string;
  bAssetToken: string;
  bAssetReward: string;
  bAssetAirdrop: string;
  mmInterest: string;
  mmOracle: string;
  mmMarket: string;
  mmOverseer: string;
  mmCustody: string;
  mmLiquidation: string;
  mmdistribution: string;
  anchorToken: string;
  terraswapFactory: string;
  blunaUlunaPair: string;
  blunaUlunaToken: string;
  anchorUusdPair: string;
  anchorUusdToken: string;
  gov: string;
  faucet: string;
  collector: string;
  community: string;
  staking: string;
  token: string;
  airdrop: string;
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

  blunaUlunaPair(): string {
    return this.data.blunaUlunaPair;
  }

  blunaUlunaToken(): string {
    return this.data.blunaUlunaToken;
  }

  gov(): string {
    return this.data.gov;
  }

  anchorUusdPair(): string {
    throw this.data.anchorUusdPair;
  }

  anchorUusdToken(): string {
    return this.data.anchorUusdToken;
  }

  collector(): string {
    return this.data.collector;
  }

  staking(): string {
    return this.data.staking;
  }

  community(): string {
    return this.data.community;
  }

  faucet(): string {
    return this.data.faucet;
  }

  anchorToken(): string {
    return this.data.token;
  }
}

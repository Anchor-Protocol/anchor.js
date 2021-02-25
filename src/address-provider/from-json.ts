import { AddressProvider } from "./provider";

interface JsonData {
  bLunaHub: string;
  blunaToken: string;
  blunaReward: string;
  blunaAirdrop: string;
  mmInterestModel: string;
  mmOracle: string;
  mmMarket: string;
  mmOverseer: string;
  mmCustody: string;
  mmLiquidation: string;
  mmdistributionModel: string;
  aTerra: string;
  terraswapFactory: string;
  terraswapblunaLunaPair: string;
  terraswapblunaLunaLPToken: string;
  terraswapAncUstPair: string;
  terraswapAncUstLPToken: string;
  gov: string;
  faucet: string;
  collector: string;
  community: string;
  staking: string;
  ANC: string;
  airdrop: string;
}

export class AddressProviderFromJson implements AddressProvider {
  constructor(private data: JsonData) {}

  blunaReward(): string {
    return this.data.blunaReward;
  }

  blunaHub(): string {
    return this.data.bLunaHub;
  }

  blunaToken(): string {
    return this.data.blunaToken;
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

  aTerra(): string {
    return this.data.aTerra;
  }

  oracle(): string {
    return this.data.mmOracle;
  }

  interest(): string {
    return this.data.mmInterestModel;
  }

  liquidation(): string {
    return this.data.mmLiquidation;
  }

  terraswapFactory(): string {
    return this.data.terraswapFactory;
  }

  terraswapblunaLunaPair(): string {
    return this.data.terraswapblunaLunaPair;
  }

  terraswapblunaLunaLPToken(): string {
    return this.data.terraswapblunaLunaLPToken;
  }

  gov(): string {
    return this.data.gov;
  }

  terraswapAncUstPair(): string {
    throw this.data.terraswapAncUstPair;
  }

  terraswapAncUstLPToken(): string {
    return this.data.terraswapAncUstLPToken;
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

  ANC(): string {
    return this.data.ANC;
  }
}

import { AddressProvider } from "./provider";

export interface AddressMap {
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
  mmDistributionModel: string;
  terraswapFactory: string;
  aTerra: string;
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

export type AllowedAddressKeys = keyof AddressMap

export class AddressProviderFromJson implements AddressProvider {
  constructor(private data: AddressMap) {}

  // @ts-ignore
  blunaReward(denom: string): string {
    return this.data.blunaReward;
  }

  // @ts-ignore
  blunaHub(denom: string): string {
    return this.data.bLunaHub;
  }

  // @ts-ignore
  blunaToken(denom: string): string {
    return this.data.blunaToken;
  }

  // @ts-ignore
  market(denom: string): string {
    return this.data.mmMarket;
  }

  // @ts-ignore
  custody(denom: string): string {
    return this.data.mmCustody;
  }

  // @ts-ignore
  overseer(denom: string): string {
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

  // @ts-ignore
  terraswapblunaLunaLPToken(quote: string): string {
    return this.data.terraswapblunaLunaLPToken;
  }

  gov(): string {
    return this.data.gov;
  }

  terraswapAncUstPair(): string {
    return this.data.terraswapAncUstPair;
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

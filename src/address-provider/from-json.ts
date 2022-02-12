import { AddressProvider } from './provider';

export interface AddressMap {
  bLunaHub: string;
  bLunaAirdrop: string;
  bLunaValidatorsRegistry: string;
  bLunaToken: string;
  mmInterestModel: string;
  mmOracle: string;
  mmMarket: string;
  mmOverseer: string;
  mmLiquidation: string;
  mmLiquidationQueue: string;
  mmDistributionModel: string;
  aTerra: string;
  bLunaLunaPair: string;
  bLunaLunaLPToken: string;
  ancUstPair: string;
  ancUstLPToken: string;
  gov: string;
  distributor: string;
  collector: string;
  community: string;
  staking: string;
  ANC: string;
  airdrop: string;
  investor_vesting: string;
  team_vesting: string;
}

export type AllowedAddressKeys = keyof AddressMap;

export class AddressProviderFromJson implements AddressProvider {
  constructor(private data: AddressMap) {}

  bLunaHub(): string {
    return this.data.bLunaHub;
  }

  bLunaValidatorsRegistry(): string {
    return this.data.bLunaValidatorsRegistry;
  }

  bLunaToken(): string {
    return this.data.bLunaToken;
  }

  market(): string {
    return this.data.mmMarket;
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

  distribution(): string {
    return this.data.mmDistributionModel;
  }

  liquidation(): string {
    return this.data.mmLiquidation;
  }

  liquidationQueue(): string {
    return this.data.mmLiquidationQueue;
  }

  bLunaLunaPair(): string {
    return this.data.bLunaLunaPair;
  }

  bLunaLunaLPToken(): string {
    return this.data.bLunaLunaLPToken;
  }

  gov(): string {
    return this.data.gov;
  }

  ancUstPair(): string {
    return this.data.ancUstPair;
  }

  ancUstLPToken(): string {
    return this.data.ancUstLPToken;
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

  distributor(): string {
    return this.data.distributor;
  }

  ANC(): string {
    return this.data.ANC;
  }

  airdrop(): string {
    return this.data.airdrop;
  }

  investorLock(): string {
    return this.data.investor_vesting;
  }

  teamLock(): string {
    return this.data.team_vesting;
  }
}

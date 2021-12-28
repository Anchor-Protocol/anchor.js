import { AddressProvider, COLLATERAL_DENOMS, MARKET_DENOMS } from './provider';

export interface AddressMap {
  bLunaHub: string;
  bLunaAirdrop: string;
  bLunaValidatorsRegistry: string;
  bLunaToken: string;
  bLunaReward: string;
  bLunaConverter: string;
  bLunaCustody: string;
  bEthToken: string;
  bEthReward: string;
  bEthConverter: string;
  bEthCustody: string;
  bEthWormhole: string;
  bAtomToken: string;
  bAtomReward: string;
  bAtomConverter: string;
  bAtomCustody: string;
  bAtomWormhole: string;
  bSolToken: string;
  bSolReward: string;
  bSolConverter: string;
  bSolCustody: string;
  bSolWormhole: string;
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

  bAssetToken(collateral: COLLATERAL_DENOMS): string {
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        return this.data.bLunaToken;
      case COLLATERAL_DENOMS.UBETH:
        return this.data.bEthToken;
      case COLLATERAL_DENOMS.UBATOM:
        return this.data.bAtomToken;
      case COLLATERAL_DENOMS.UBSOL:
        return this.data.bSolToken;
    }
  }

  bAssetReward(collateral: COLLATERAL_DENOMS): string {
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        return this.data.bLunaReward;
      case COLLATERAL_DENOMS.UBETH:
        return this.data.bEthReward;
      case COLLATERAL_DENOMS.UBATOM:
        return this.data.bAtomReward;
      case COLLATERAL_DENOMS.UBSOL:
        return this.data.bSolReward;
    }
  }

  bAssetConverter(collateral: COLLATERAL_DENOMS): string {
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        return this.data.bLunaConverter;
      case COLLATERAL_DENOMS.UBETH:
        return this.data.bEthConverter;
      case COLLATERAL_DENOMS.UBATOM:
        return this.data.bAtomConverter;
      case COLLATERAL_DENOMS.UBSOL:
        return this.data.bSolConverter;
    }
  }

  bAssetCustody(_denom: MARKET_DENOMS, collateral: COLLATERAL_DENOMS): string {
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        return this.data.bLunaCustody;
      case COLLATERAL_DENOMS.UBETH:
        return this.data.bEthCustody;
      case COLLATERAL_DENOMS.UBATOM:
        return this.data.bAtomCustody;
      case COLLATERAL_DENOMS.UBSOL:
        return this.data.bSolCustody;
    }
  }

  bAssetWormhole(collateral: COLLATERAL_DENOMS): string {
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        throw Error('No Wormhole address for bLuna is supported.');
      case COLLATERAL_DENOMS.UBETH:
        return this.data.bEthWormhole;
      case COLLATERAL_DENOMS.UBATOM:
        return this.data.bAtomWormhole;
      case COLLATERAL_DENOMS.UBSOL:
        return this.data.bSolWormhole;
    }
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

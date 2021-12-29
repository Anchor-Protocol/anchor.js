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
    let address = '';
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        address = this.data.bLunaToken;
        break;
      case COLLATERAL_DENOMS.UBETH:
        address = this.data.bEthToken;
        break;
      case COLLATERAL_DENOMS.UBATOM:
        address = this.data.bAtomToken;
        break;
      case COLLATERAL_DENOMS.UBSOL:
        address = this.data.bSolToken;
        break;
    }
    if (address.trim().length === 0) {
      throw Error(`The collateral ${collateral} is not currently supported.`);
    }
    return address;
  }

  bAssetReward(collateral: COLLATERAL_DENOMS): string {
    let address = '';
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        address = this.data.bLunaReward;
        break;
      case COLLATERAL_DENOMS.UBETH:
        address = this.data.bEthReward;
        break;
      case COLLATERAL_DENOMS.UBATOM:
        address = this.data.bAtomReward;
        break;
      case COLLATERAL_DENOMS.UBSOL:
        address = this.data.bSolReward;
        break;
    }
    if (address.trim().length === 0) {
      throw Error(`The collateral ${collateral} is not currently supported.`);
    }
    return address;
  }

  bAssetConverter(collateral: COLLATERAL_DENOMS): string {
    let address = '';
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        address = this.data.bLunaConverter;
        break;
      case COLLATERAL_DENOMS.UBETH:
        address = this.data.bEthConverter;
        break;
      case COLLATERAL_DENOMS.UBATOM:
        address = this.data.bAtomConverter;
        break;
      case COLLATERAL_DENOMS.UBSOL:
        address = this.data.bSolConverter;
        break;
    }
    if (address.trim().length === 0) {
      throw Error(`The collateral ${collateral} is not currently supported.`);
    }
    return address;
  }

  bAssetCustody(_denom: MARKET_DENOMS, collateral: COLLATERAL_DENOMS): string {
    let address = '';
    switch (collateral) {
      case COLLATERAL_DENOMS.UBLUNA:
        address = this.data.bLunaCustody;
        break;
      case COLLATERAL_DENOMS.UBETH:
        address = this.data.bEthCustody;
        break;
      case COLLATERAL_DENOMS.UBATOM:
        address = this.data.bAtomConverter;
        break;
      case COLLATERAL_DENOMS.UBSOL:
        address = this.data.bSolCustody;
        break;
    }
    if (address.trim().length === 0) {
      throw Error(`The collateral ${collateral} is not currently supported.`);
    }
    return address;
  }

  bAssetWormhole(collateral: COLLATERAL_DENOMS): string {
    let address = '';
    switch (collateral) {
      case COLLATERAL_DENOMS.UBETH:
        address = this.data.bEthWormhole;
        break;
      case COLLATERAL_DENOMS.UBATOM:
        address = this.data.bAtomWormhole;
        break;
      case COLLATERAL_DENOMS.UBSOL:
        address = this.data.bSolWormhole;
        break;
    }
    if (address.trim().length === 0) {
      throw Error(`The collateral ${collateral} is not currently supported.`);
    }
    return address;
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

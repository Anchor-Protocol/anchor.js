export interface AddressProvider {
  bLunaReward(): string;

  bLunaHub(): string;

  bLunaToken(): string;

  bLunaValidatorsRegistry(): string;

  bEthReward(): string;

  bEthToken(): string;

  market(denom: MARKET_DENOMS): string;

  custody(denom: MARKET_DENOMS, collateral: COLLATERAL_DENOMS): string;

  overseer(denom: MARKET_DENOMS): string;

  aTerra(denom: MARKET_DENOMS): string;

  oracle(): string;

  interest(): string;

  distribution(): string;

  liquidation(): string;

  liquidationQueue(): string;

  bLunaLunaPair(): string;

  bLunaLunaLPToken(): string;

  gov(): string;

  ancUstPair(): string;

  ancUstLPToken(): string;

  ANC(): string;

  collector(): string;

  staking(): string;

  community(): string;

  distributor(): string;

  airdrop(): string;

  investorLock(): string;

  teamLock(): string;
}

export enum MARKET_DENOMS {
  UUSD = 'uusd',
  UKRW = 'ukrw',
}

export enum COLLATERAL_DENOMS {
  UBLUNA = 'ubluna',
  UBETH = 'ubeth',
}

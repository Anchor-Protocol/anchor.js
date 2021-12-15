export interface AddressProvider {
  bLunaHub(): string;

  bLunaValidatorsRegistry(): string;

  bAssetToken(bAsset: COLLATERAL_DENOMS): string;

  bAssetReward(bAsset: COLLATERAL_DENOMS): string;

  bAssetConverter(bAsset: COLLATERAL_DENOMS): string;

  bAssetCustody(denom: MARKET_DENOMS, bAsset: COLLATERAL_DENOMS): string;

  market(denom: MARKET_DENOMS): string;

  overseer(denom: MARKET_DENOMS): string;

  aTerra(denom: MARKET_DENOMS): string;

  oracle(): string;

  interest(): string;

  liquidation(): string;

  liquidationQueue(): string;

  terraswapblunaLunaPair(): string;

  terraswapblunaLunaLPToken(): string;

  gov(): string;

  terraswapAncUstPair(): string;

  terraswapAncUstLPToken(): string;

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
  UBSOL = 'ubsol',
  UBATOM = 'ubatom',
}

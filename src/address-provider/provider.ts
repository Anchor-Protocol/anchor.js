export interface AddressProvider {
  bLunaReward(): string;

  bLunaHub(): string;

  bLunaToken(): string;

  // https://github.com/Anchor-Protocol/money-market-contracts/tree/master/artifacts
  // moneymarket_market.wasm
  market(denom: string): string;

  custody(denom: string): string;

  overseer(denom: string): string;

  aTerra(denom: string): string;

  oracle(): string;

  interest(): string;

  liquidation(): string;

  terraswapFactory(): string;

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
  'uusd' = 'uusd',
  'ukrw' = 'ukrw'
}

export enum CUSTODY_DENOMS {
  'ubluna' = 'ubluna',
}


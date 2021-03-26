import { COLLATERAL_DENOMS, MARKET_DENOMS } from "../address-provider";

export type AnchorMarkets = MARKET_DENOMS
export type Collaterals = COLLATERAL_DENOMS

export interface SlippageToleranceConfig {
  beliefPrice: string,
  maxSpread: string,
}
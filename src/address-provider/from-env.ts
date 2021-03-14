import { reactifyEnv } from "./react-app-prefix";
import { AddressProvider } from "./provider";

export class AddressProviderFromEnvVar implements AddressProvider {
  blunaReward(): string {
    return getFromEnv("bAssetReward");
  }

  blunaHub(): string {
    return getFromEnv("bLuna");
  }

  blunaToken(): string {
    return getFromEnv("bAssetToken");
  }

  bAsset(): string {
    return getFromEnv("bAsset");
  }

  market(): string {
    return getFromEnv("mmMarket");
  }

  custody(): string {
    return getFromEnv("mmCustody");
  }

  overseer(): string {
    return getFromEnv("mmOverseer");
  }

  aTerra(): string {
    return getFromEnv("aUST");
  }

  oracle(): string {
    return getFromEnv("mmOracle");
  }

  interest(): string {
    return getFromEnv("mmInterest");
  }

  liquidation(): string {
    return getFromEnv("mmLiquidation");
  }

  terraswapFactory(): string {
    return getFromEnv("terraswapFactory");
  }

  terraswapblunaLunaPair(): string {
    return getFromEnv("bLunaBurnPair");
  }

  terraswapblunaLunaLPToken(nativeDenom: string): string {
    return getFromEnv(`blunaUlunaToken${nativeDenom}`);
  }

  gov(): string {
    return getFromEnv(`gov`);
  }

  terraswapAncUstPair(): string {
    return getFromEnv(`anchorUusdPair`);
  }

  terraswapAncUstLPToken(): string {
    return getFromEnv(`anchorUusdPair`);
  }

  collector(): string {
    return getFromEnv(`collector`);
  }

  staking(): string {
    return getFromEnv(`staking`);
  }

  community(): string {
    return getFromEnv(`community`);
  }

  distributor(): string {
    return getFromEnv(`distributor`);
  }

  ANC(): string {
    return getFromEnv(`token`);
  }

  airdrop(): string {
    return getFromEnv(`airdrop`)
  }

  investorLock(): string {
    return getFromEnv(`vesting`)
  }

  teamLock(): string {
    return getFromEnv(`team`)
  }
}

function getFromEnv(key: string): string {
  const val = process.env[reactifyEnv(key)];
  if (typeof val === "undefined") {
    throw new Error(`address provider could not resolve key ${key}`);
  }
  return val;
}

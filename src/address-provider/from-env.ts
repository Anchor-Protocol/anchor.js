import { reactifyEnv } from "./react-app-prefix";
import { AddressProvider } from "./provider";

export class AddressProviderFromEnvVar implements AddressProvider {
  // @ts-ignore
  blunaReward(denom: string): string {
    return getFromEnv("bAssetReward");
  }

  // @ts-ignore
  blunaHub(denom: string): string {
    return getFromEnv("bLuna");
  }

  // @ts-ignore
  blunaToken(denom: string): string {
    return getFromEnv("bAssetToken");
  }

  bAsset(): string {
    return getFromEnv("bAsset");
  }

  // @ts-ignore
  market(denom: string): string {
    return getFromEnv("mmMarket");
  }

  // @ts-ignore
  custody(denom: string): string {
    return getFromEnv("mmCustody");
  }

  // @ts-ignore
  overseer(denom: string): string {
    return getFromEnv("mmOverseer");
  }

  // @ts-ignore
  aTerra(denom: string): string {
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

  faucet(): string {
    return getFromEnv(`faucet`);
  }

  ANC(): string {
    return getFromEnv(`token`);
  }
}

function getFromEnv(key: string): string {
  const val = process.env[reactifyEnv(key)];
  if (typeof val === "undefined") {
    throw new Error(`address provider could not resolve key ${key}`);
  }
  return val;
}

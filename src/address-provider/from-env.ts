import { reactifyEnv } from "./react-app-prefix";
import { AddressProvider } from "./provider";

//console.log(process.env);

export class AddressProviderFromEnvVar implements AddressProvider {
  bAssetReward(): string {
    return getFromEnv("bAssetReward");
  }

  bAssetHub(): string {
    return getFromEnv("bLuna");
  }

  bAssetToken(): string {
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

  aToken(): string {
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

  blunaUlunaPair(): string {
    return getFromEnv("bLunaBurnPair");
  }

  blunaUlunaToken(nativeDenom: string): string {
    return getFromEnv(`blunaUlunaToken${nativeDenom}`);
  }

  gov(): string {
    return getFromEnv(`gov`);
  }

  anchorUusdPair(): string {
    return getFromEnv(`anchorUusdPair`);
  }

  anchorUusdToken(): string {
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

  anchorToken(): string {
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

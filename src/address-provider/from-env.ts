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

  blunaBurnPair(): string {
    return getFromEnv("bLunaBurnPair");
  }

  blunaBurn(nativeDenom: string): string {
    return getFromEnv(`bLunaBurn${nativeDenom}`);
  }
}

function getFromEnv(key: string): string {
  const val = process.env[reactifyEnv(key)];
  if (typeof val === "undefined") {
    throw new Error(`address provider could not resolve key ${key}`);
  }
  return val;
}

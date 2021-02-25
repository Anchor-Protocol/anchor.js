import { AddressProvider } from "./provider";
export declare class AddressProviderFromEnvVar implements AddressProvider {
    bAssetReward(): string;
    bAssetHub(): string;
    bAssetToken(): string;
    bAsset(): string;
    market(): string;
    custody(): string;
    overseer(): string;
    aToken(): string;
    oracle(): string;
    interest(): string;
    liquidation(): string;
    terraswapFactory(): string;
    blunaUlunaPair(): string;
    blunaUlunaToken(nativeDenom: string): string;
    gov(): string;
    anchorUusdPair(): string;
    anchorUusdToken(): string;
    collector(): string;
    staking(): string;
    community(): string;
    faucet(): string;
    anchorToken(): string;
}

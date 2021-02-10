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
    blunaBurnPair(): string;
    blunaBurn(nativeDenom: string): string;
}

export interface AddressProvider {
    bAssetReward(denom: string): string;
    bAssetHub(denom: string): string;
    bAssetToken(denom: string): string;
    market(denom: string): string;
    custody(denom: string): string;
    overseer(denom: string): string;
    aToken(denom: string): string;
    oracle(): string;
    interest(): string;
    liquidation(): string;
    terraswapFactory(): string;
    blunaBurnPair(): string;
    blunaBurn(quote: string): string;
}

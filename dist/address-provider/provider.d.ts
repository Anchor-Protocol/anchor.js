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
    blunaUlunaPair(): string;
    blunaUlunaToken(quote: string): string;
    gov(): string;
    anchorUusdPair(): string;
    anchorUusdToken(): string;
    anchorToken(): string;
    collector(): string;
    staking(): string;
    community(): string;
    faucet(): string;
}

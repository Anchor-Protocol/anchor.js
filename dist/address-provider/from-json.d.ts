import { AddressProvider } from './provider';
interface JsonData {
    bLunaHub: string;
    bAssetToken: string;
    bAssetReward: string;
    mmInterest: string;
    mmOracle: string;
    mmMarket: string;
    mmOverseer: string;
    mmCustody: string;
    mmLiquidation: string;
    anchorToken: string;
    terraswapFactory: string;
    blunaBurnPair: string;
    blunaBurnuluna: string;
}
export declare class AddressProviderFromJson implements AddressProvider {
    private data;
    constructor(data: JsonData);
    bAssetReward(): string;
    bAssetHub(): string;
    bAssetToken(): string;
    market(): string;
    custody(): string;
    overseer(): string;
    aToken(): string;
    oracle(): string;
    interest(): string;
    liquidation(): string;
    terraswapFactory(): string;
    blunaBurnPair(): string;
    blunaBurn(): string;
}
export {};

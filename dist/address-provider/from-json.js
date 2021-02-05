"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressProviderFromJson = void 0;
class AddressProviderFromJson {
    constructor(data) {
        this.data = data;
    }
    bAssetReward() {
        return this.data.bAssetReward;
    }
    bAssetHub() {
        return this.data.bLunaHub;
    }
    bAssetToken() {
        return this.data.bAssetToken;
    }
    market() {
        return this.data.mmMarket;
    }
    custody() {
        return this.data.mmCustody;
    }
    overseer() {
        return this.data.mmOverseer;
    }
    aToken() {
        return this.data.anchorToken;
    }
    oracle() {
        return this.data.mmOracle;
    }
    interest() {
        return this.data.mmInterest;
    }
    liquidation() {
        return this.data.mmLiquidation;
    }
    terraswapFactory() {
        return this.data.terraswapFactory;
    }
    blunaBurnPair() {
        return this.data.blunaBurnPair;
    }
    blunaBurn() {
        return this.data.blunaBurnuluna;
    }
}
exports.AddressProviderFromJson = AddressProviderFromJson;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressProviderFromJson = void 0;
var AddressProviderFromJson = /** @class */ (function () {
    function AddressProviderFromJson(data) {
        this.data = data;
    }
    AddressProviderFromJson.prototype.bAssetReward = function () {
        return this.data.bAssetReward;
    };
    AddressProviderFromJson.prototype.bAssetHub = function () {
        return this.data.bLunaHub;
    };
    AddressProviderFromJson.prototype.bAssetToken = function () {
        return this.data.bAssetToken;
    };
    AddressProviderFromJson.prototype.market = function () {
        return this.data.mmMarket;
    };
    AddressProviderFromJson.prototype.custody = function () {
        return this.data.mmCustody;
    };
    AddressProviderFromJson.prototype.overseer = function () {
        return this.data.mmOverseer;
    };
    AddressProviderFromJson.prototype.aToken = function () {
        return this.data.anchorToken;
    };
    AddressProviderFromJson.prototype.oracle = function () {
        return this.data.mmOracle;
    };
    AddressProviderFromJson.prototype.interest = function () {
        return this.data.mmInterest;
    };
    AddressProviderFromJson.prototype.liquidation = function () {
        return this.data.mmLiquidation;
    };
    AddressProviderFromJson.prototype.terraswapFactory = function () {
        return this.data.terraswapFactory;
    };
    AddressProviderFromJson.prototype.blunaBurnPair = function () {
        return this.data.blunaBurnPair;
    };
    AddressProviderFromJson.prototype.blunaBurn = function () {
        return this.data.blunaBurnuluna;
    };
    return AddressProviderFromJson;
}());
exports.AddressProviderFromJson = AddressProviderFromJson;
//# sourceMappingURL=from-json.js.map
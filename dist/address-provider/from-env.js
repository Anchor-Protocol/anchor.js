"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressProviderFromEnvVar = void 0;
var react_app_prefix_1 = require("./react-app-prefix");
//console.log(process.env);
var AddressProviderFromEnvVar = /** @class */ (function () {
    function AddressProviderFromEnvVar() {
    }
    AddressProviderFromEnvVar.prototype.bAssetReward = function () {
        return getFromEnv("bAssetReward");
    };
    AddressProviderFromEnvVar.prototype.bAssetHub = function () {
        return getFromEnv("bLuna");
    };
    AddressProviderFromEnvVar.prototype.bAssetToken = function () {
        return getFromEnv("bAssetToken");
    };
    AddressProviderFromEnvVar.prototype.bAsset = function () {
        return getFromEnv("bAsset");
    };
    AddressProviderFromEnvVar.prototype.market = function () {
        return getFromEnv("mmMarket");
    };
    AddressProviderFromEnvVar.prototype.custody = function () {
        return getFromEnv("mmCustody");
    };
    AddressProviderFromEnvVar.prototype.overseer = function () {
        return getFromEnv("mmOverseer");
    };
    AddressProviderFromEnvVar.prototype.aToken = function () {
        return getFromEnv("aUST");
    };
    AddressProviderFromEnvVar.prototype.oracle = function () {
        return getFromEnv("mmOracle");
    };
    AddressProviderFromEnvVar.prototype.interest = function () {
        return getFromEnv("mmInterest");
    };
    AddressProviderFromEnvVar.prototype.liquidation = function () {
        return getFromEnv("mmLiquidation");
    };
    AddressProviderFromEnvVar.prototype.terraswapFactory = function () {
        return getFromEnv("terraswapFactory");
    };
    AddressProviderFromEnvVar.prototype.blunaBurnPair = function () {
        return getFromEnv("bLunaBurnPair");
    };
    AddressProviderFromEnvVar.prototype.blunaBurn = function (nativeDenom) {
        return getFromEnv("bLunaBurn" + nativeDenom);
    };
    return AddressProviderFromEnvVar;
}());
exports.AddressProviderFromEnvVar = AddressProviderFromEnvVar;
function getFromEnv(key) {
    var val = process.env[react_app_prefix_1.reactifyEnv(key)];
    if (typeof val === "undefined") {
        throw new Error("address provider could not resolve key " + key);
    }
    return val;
}
//# sourceMappingURL=from-env.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressProviderFromEnvVar = void 0;
const react_app_prefix_1 = require("./react-app-prefix");
//console.log(process.env);
class AddressProviderFromEnvVar {
    bAssetReward() {
        return getFromEnv('bAssetReward');
    }
    bAssetHub() {
        return getFromEnv('bLuna');
    }
    bAssetToken() {
        return getFromEnv('bAssetToken');
    }
    bAsset() {
        return getFromEnv('bAsset');
    }
    market() {
        return getFromEnv('mmMarket');
    }
    custody() {
        return getFromEnv('mmCustody');
    }
    overseer() {
        return getFromEnv('mmOverseer');
    }
    aToken() {
        return getFromEnv('aUST');
    }
    oracle() {
        return getFromEnv('mmOracle');
    }
    interest() {
        return getFromEnv('mmInterest');
    }
    liquidation() {
        return getFromEnv('mmLiquidation');
    }
    terraswapFactory() {
        return getFromEnv('terraswapFactory');
    }
    blunaBurnPair() {
        return getFromEnv('bLunaBurnPair');
    }
    blunaBurn(nativeDenom) {
        return getFromEnv(`bLunaBurn${nativeDenom}`);
    }
}
exports.AddressProviderFromEnvVar = AddressProviderFromEnvVar;
function getFromEnv(key) {
    const val = process.env[react_app_prefix_1.reactifyEnv(key)];
    if (typeof val === 'undefined') {
        throw new Error(`address provider could not resolve key ${key}`);
    }
    return val;
}

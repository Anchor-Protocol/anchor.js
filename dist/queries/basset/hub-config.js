"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubConfig = void 0;
const queryHubConfig = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        config: {},
    });
    return reponse;
};
exports.queryHubConfig = queryHubConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubParams = void 0;
const queryHubParams = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        parameters: {},
    });
    return reponse;
};
exports.queryHubParams = queryHubParams;

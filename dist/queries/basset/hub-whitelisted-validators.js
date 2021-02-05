"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubWhiteVals = void 0;
const queryHubWhiteVals = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        whitelisted_validators: {},
    });
    return reponse;
};
exports.queryHubWhiteVals = queryHubWhiteVals;

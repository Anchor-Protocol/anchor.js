"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubCurrentBatch = void 0;
const queryHubCurrentBatch = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        current_batch: {},
    });
    return reponse;
};
exports.queryHubCurrentBatch = queryHubCurrentBatch;

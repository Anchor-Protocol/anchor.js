"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubState = void 0;
const queryHubState = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        state: {},
    });
    return reponse;
};
exports.queryHubState = queryHubState;

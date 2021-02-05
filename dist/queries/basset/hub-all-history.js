"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubHistory = void 0;
const queryHubHistory = ({ lcd, bAsset, startFrom, lim, }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        all_history: {
            start_from: +startFrom,
            limit: +lim,
        },
    });
    return reponse;
};
exports.queryHubHistory = queryHubHistory;

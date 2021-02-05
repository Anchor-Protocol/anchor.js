"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRewardHolders = void 0;
const queryRewardHolders = ({ lcd, bAsset, startAfter, lim, }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetReward(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        holders: {
            start_after: startAfter,
            limit: lim,
        },
    });
    return reponse;
};
exports.queryRewardHolders = queryRewardHolders;

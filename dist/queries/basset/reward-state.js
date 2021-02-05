"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRewardState = void 0;
const queryRewardState = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetReward(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        state: {},
    });
    return reponse;
};
exports.queryRewardState = queryRewardState;

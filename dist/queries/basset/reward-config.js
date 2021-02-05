"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRewardConfig = void 0;
const queryRewardConfig = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetReward(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        config: {},
    });
    return reponse;
};
exports.queryRewardConfig = queryRewardConfig;

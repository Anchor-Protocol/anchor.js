"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRewardHolder = void 0;
const queryRewardHolder = ({ lcd, bAsset, address }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetReward(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        holder: {
            address: address,
        },
    });
    return reponse;
};
exports.queryRewardHolder = queryRewardHolder;

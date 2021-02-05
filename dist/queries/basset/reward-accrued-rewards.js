"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryRewardAccrued = void 0;
const queryRewardAccrued = ({ lcd, bAsset, address }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetReward(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        accrued_rewards: {
            address: address,
        },
    });
    return reponse;
};
exports.queryRewardAccrued = queryRewardAccrued;

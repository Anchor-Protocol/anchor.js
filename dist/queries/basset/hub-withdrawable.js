"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubWithdrawable = void 0;
const queryHubWithdrawable = ({ lcd, bAsset, address, block_time, }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        withdrawable_unbonded: {
            address: address,
            block_time: +block_time,
        },
    });
    return reponse;
};
exports.queryHubWithdrawable = queryHubWithdrawable;

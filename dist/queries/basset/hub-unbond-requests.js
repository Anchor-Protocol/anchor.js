"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHubUnbond = void 0;
const queryHubUnbond = ({ lcd, bAsset, address }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        unbond_requests: {
            address: address,
        },
    });
    return reponse;
};
exports.queryHubUnbond = queryHubUnbond;

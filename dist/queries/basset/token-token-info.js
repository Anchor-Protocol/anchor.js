"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTokenInfo = void 0;
const queryTokenInfo = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        token_info: {},
    });
    return reponse;
};
exports.queryTokenInfo = queryTokenInfo;

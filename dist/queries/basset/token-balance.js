"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTokenBalance = void 0;
const queryTokenBalance = ({ lcd, bAsset, address }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        balance: {
            address: address,
        },
    });
    return reponse;
};
exports.queryTokenBalance = queryTokenBalance;

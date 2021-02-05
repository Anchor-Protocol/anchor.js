"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTokenMinter = void 0;
const queryTokenMinter = ({ lcd, bAsset }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        minter: {},
    });
    return reponse;
};
exports.queryTokenMinter = queryTokenMinter;

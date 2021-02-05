"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTokenAllAllowance = void 0;
const queryTokenAllAllowance = ({ lcd, bAsset, owner, startAfter, lim, }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        all_allowances: {
            owner: owner,
            start_after: startAfter,
            limit: lim,
        },
    });
    return reponse;
};
exports.queryTokenAllAllowance = queryTokenAllAllowance;

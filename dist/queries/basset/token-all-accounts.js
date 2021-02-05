"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTokenAllAccounts = void 0;
const queryTokenAllAccounts = ({ lcd, bAsset, startAfter, lim, }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        all_accounts: {
            start_after: startAfter,
            limit: +lim,
        },
    });
    return reponse;
};
exports.queryTokenAllAccounts = queryTokenAllAccounts;

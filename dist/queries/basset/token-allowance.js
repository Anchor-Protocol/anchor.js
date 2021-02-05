"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryTokenAllowance = void 0;
const queryTokenAllowance = ({ lcd, bAsset, owner, spender, }) => async (addressProvider) => {
    const bAssetContractAddress = addressProvider.bAssetToken(bAsset);
    let reponse = await lcd.wasm.contractQuery(bAssetContractAddress, {
        allowance: {
            owner: owner,
            spender: spender,
        },
    });
    return reponse;
};
exports.queryTokenAllowance = queryTokenAllowance;

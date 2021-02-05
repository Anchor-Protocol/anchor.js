"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerWhitelist = void 0;
const queryOverseerWhitelist = ({ lcd, overseer, collateralToken, startAfter, limit, }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        whitelist: {
            collateral_token: collateralToken,
            start_after: startAfter,
            limit: +limit,
        },
    });
    return response;
};
exports.queryOverseerWhitelist = queryOverseerWhitelist;

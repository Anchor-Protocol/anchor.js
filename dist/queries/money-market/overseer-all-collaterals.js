"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerAllCollaterals = void 0;
const queryOverseerAllCollaterals = ({ lcd, overseer, startAfter, limit, }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        all_collaterals: {
            start_after: startAfter,
            limit: +limit,
        },
    });
    return response;
};
exports.queryOverseerAllCollaterals = queryOverseerAllCollaterals;

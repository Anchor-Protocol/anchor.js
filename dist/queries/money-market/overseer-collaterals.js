"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerCollaterals = void 0;
const queryOverseerCollaterals = ({ lcd, overseer, borrower, }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        collaterals: {
            borrower: borrower,
        },
    });
    return response;
};
exports.queryOverseerCollaterals = queryOverseerCollaterals;

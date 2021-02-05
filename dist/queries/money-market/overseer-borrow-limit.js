"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerBorrowLimit = void 0;
const queryOverseerBorrowLimit = ({ lcd, overseer, borrower, blockTime, }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        borrow_limit: {
            borrower: borrower,
            block_time: +blockTime,
        },
    });
    return response;
};
exports.queryOverseerBorrowLimit = queryOverseerBorrowLimit;

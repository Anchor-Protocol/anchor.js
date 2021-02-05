"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCustodyBorrowers = void 0;
const queryCustodyBorrowers = ({ lcd, custody, startAfter, limit, }) => async (addressProvider) => {
    const custodyContractAddress = addressProvider.custody(custody);
    let response = await lcd.wasm.contractQuery(custodyContractAddress, {
        borrowers: {
            start_after: startAfter,
            limit: +limit,
        },
    });
    return response;
};
exports.queryCustodyBorrowers = queryCustodyBorrowers;

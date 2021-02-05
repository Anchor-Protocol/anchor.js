"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCustodyBorrower = void 0;
const queryCustodyBorrower = ({ lcd, custody, address, }) => async (addressProvider) => {
    const custodyContractAddress = addressProvider.custody(custody);
    let response = await lcd.wasm.contractQuery(custodyContractAddress, {
        borrower: {
            address: address,
        },
    });
    return response;
};
exports.queryCustodyBorrower = queryCustodyBorrower;

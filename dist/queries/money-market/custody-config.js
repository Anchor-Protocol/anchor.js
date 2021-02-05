"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryCustodyConfig = void 0;
const queryCustodyConfig = ({ lcd, custody }) => async (addressProvider) => {
    const custodyContractAddress = addressProvider.custody(custody);
    let response = await lcd.wasm.contractQuery(custodyContractAddress, {
        config: {},
    });
    return response;
};
exports.queryCustodyConfig = queryCustodyConfig;

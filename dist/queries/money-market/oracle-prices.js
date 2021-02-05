"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOraclePrices = void 0;
const queryOraclePrices = ({ lcd, startAfter, limit }) => async (addressProvider) => {
    const oracleContractAddress = addressProvider.oracle();
    let response = await lcd.wasm.contractQuery(oracleContractAddress, {
        prices: {
            start_after: startAfter,
            limit: +limit,
        },
    });
    return response;
};
exports.queryOraclePrices = queryOraclePrices;

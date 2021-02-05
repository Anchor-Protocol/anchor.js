"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOraclePrice = void 0;
const queryOraclePrice = ({ lcd, base, quote }) => async (addressProvider) => {
    const oracleContractAddress = addressProvider.oracle();
    let response = await lcd.wasm.contractQuery(oracleContractAddress, {
        price: {
            base: base,
            quote: quote,
        },
    });
    return response;
};
exports.queryOraclePrice = queryOraclePrice;

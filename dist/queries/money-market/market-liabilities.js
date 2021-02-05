"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMarketLiabilities = void 0;
const queryMarketLiabilities = ({ lcd, market, startAfter, limit, }) => async (addressProvider) => {
    const marketContractAddress = addressProvider.market(market);
    let response = await lcd.wasm.contractQuery(marketContractAddress, {
        liabilities: {
            start_after: startAfter,
            limit: +limit,
        },
    });
    return response;
};
exports.queryMarketLiabilities = queryMarketLiabilities;

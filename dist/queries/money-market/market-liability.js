"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMarketLiability = void 0;
const queryMarketLiability = ({ lcd, market, borrower, }) => async (addressProvider) => {
    const marketContractAddress = addressProvider.market(market);
    let response = await lcd.wasm.contractQuery(marketContractAddress, {
        liability: {
            borrower: borrower,
        },
    });
    return response;
};
exports.queryMarketLiability = queryMarketLiability;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMarketLoanAmount = void 0;
const queryMarketLoanAmount = ({ lcd, market, borrower, blockHeight, }) => async (addressProvider) => {
    const marketContractAddress = addressProvider.market(market);
    let response = await lcd.wasm.contractQuery(marketContractAddress, {
        loan_amount: {
            borrower: borrower,
            block_height: +blockHeight,
        },
    });
    return response;
};
exports.queryMarketLoanAmount = queryMarketLoanAmount;

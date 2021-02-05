"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryInterestModelBorrowRate = void 0;
const queryInterestModelBorrowRate = ({ lcd, marketBalance, totalLiabilities, totalReserves, }) => async (addressProvider) => {
    const interestModelContractAddress = addressProvider.interest();
    let response = await lcd.wasm.contractQuery(interestModelContractAddress, {
        borrow_rate: {
            market_balance: marketBalance,
            total_liabilities: totalLiabilities,
            total_reserves: totalReserves,
        },
    });
    return response;
};
exports.queryInterestModelBorrowRate = queryInterestModelBorrowRate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMarketState = void 0;
const queryMarketState = ({ lcd, market }) => async (addressProvider) => {
    const marketContractAddress = addressProvider.market(market);
    let response = await lcd.wasm.contractQuery(marketContractAddress, {
        state: {},
    });
    return response;
};
exports.queryMarketState = queryMarketState;

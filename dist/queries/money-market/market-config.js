"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMarketConfig = void 0;
const queryMarketConfig = ({ lcd, market }) => async (addressProvider) => {
    const marketContractAddress = addressProvider.market(market);
    let response = await lcd.wasm.contractQuery(marketContractAddress, {
        config: {},
    });
    return response;
};
exports.queryMarketConfig = queryMarketConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMarketEpochState = void 0;
const queryMarketEpochState = ({ lcd, market, blockHeight, }) => async (addressProvider) => {
    const marketContractAddress = addressProvider.market(market);
    let response = await lcd.wasm.contractQuery(marketContractAddress, {
        epoch_state: {
            block_height: +blockHeight,
        },
    });
    return response;
};
exports.queryMarketEpochState = queryMarketEpochState;

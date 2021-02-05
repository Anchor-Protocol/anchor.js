"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLiquidationBidsByUser = void 0;
const queryLiquidationBidsByUser = ({ lcd, bidder, startAfter, limit, }) => async (addressProvider) => {
    const liquidationContractAddress = addressProvider.liquidation();
    let response = await lcd.wasm.contractQuery(liquidationContractAddress, {
        bids_by_user: { bidder: bidder, start_after: startAfter, limit: +limit },
    });
    return response;
};
exports.queryLiquidationBidsByUser = queryLiquidationBidsByUser;

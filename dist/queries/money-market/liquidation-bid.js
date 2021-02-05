"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLiquidationBid = void 0;
const queryLiquidationBid = ({ lcd, collateralToken, bidder, }) => async (addressProvider) => {
    const liquidationContractAddress = addressProvider.liquidation();
    let response = await lcd.wasm.contractQuery(liquidationContractAddress, {
        bid: { collateral_token: collateralToken, bidder: bidder },
    });
    return response;
};
exports.queryLiquidationBid = queryLiquidationBid;

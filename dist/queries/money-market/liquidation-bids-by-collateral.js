"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLiquidationBidsByCollateral = void 0;
const queryLiquidationBidsByCollateral = ({ lcd, collateralToken, startAfter, limit, }) => async (addressProvider) => {
    const liquidationContractAddress = addressProvider.liquidation();
    let response = await lcd.wasm.contractQuery(liquidationContractAddress, {
        bids_by_collateral: {
            collateral_token: collateralToken,
            start_after: startAfter,
            limit: +limit,
        },
    });
    return response;
};
exports.queryLiquidationBidsByCollateral = queryLiquidationBidsByCollateral;

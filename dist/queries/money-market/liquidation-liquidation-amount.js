"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLiquidationLiquidationAmount = void 0;
const queryLiquidationLiquidationAmount = ({ lcd, borrowAmount, borrowLimit, collaterals, collateralPrices, }) => async (addressProvider) => {
    const liquidationContractAddress = addressProvider.liquidation();
    let response = await lcd.wasm.contractQuery(liquidationContractAddress, {
        liquidation_amount: {
            borrow_amount: borrowAmount,
            borrow_limit: borrowLimit,
            collaterals: collaterals,
            collateral_prices: collateralPrices,
        },
    });
    return response;
};
exports.queryLiquidationLiquidationAmount = queryLiquidationLiquidationAmount;

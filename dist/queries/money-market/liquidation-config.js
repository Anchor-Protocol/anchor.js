"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryLiquidationConfig = void 0;
const queryLiquidationConfig = ({ lcd }) => async (addressProvider) => {
    const liquidationContractAddress = addressProvider.liquidation();
    let response = await lcd.wasm.contractQuery(liquidationContractAddress, {
        config: {},
    });
    return response;
};
exports.queryLiquidationConfig = queryLiquidationConfig;

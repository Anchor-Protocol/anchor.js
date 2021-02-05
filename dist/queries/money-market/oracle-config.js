"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOracleConfig = void 0;
const queryOracleConfig = ({ lcd }) => async (addressProvider) => {
    const oracleContractAddress = addressProvider.oracle();
    let response = await lcd.wasm.contractQuery(oracleContractAddress, {
        config: {},
    });
    return response;
};
exports.queryOracleConfig = queryOracleConfig;

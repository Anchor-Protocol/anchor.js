"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryInterestModelConfig = void 0;
const queryInterestModelConfig = ({ lcd }) => async (addressProvider) => {
    const interestModelContractAddress = addressProvider.interest();
    let response = await lcd.wasm.contractQuery(interestModelContractAddress, {
        config: {},
    });
    return response;
};
exports.queryInterestModelConfig = queryInterestModelConfig;

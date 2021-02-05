"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerDistributionParams = void 0;
const queryOverseerDistributionParams = ({ lcd, overseer, }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        distribution_params: {},
    });
    return response;
};
exports.queryOverseerDistributionParams = queryOverseerDistributionParams;

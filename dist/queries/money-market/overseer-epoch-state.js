"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerEpochState = void 0;
const queryOverseerEpochState = ({ lcd, overseer }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        epoch_state: {},
    });
    return response;
};
exports.queryOverseerEpochState = queryOverseerEpochState;

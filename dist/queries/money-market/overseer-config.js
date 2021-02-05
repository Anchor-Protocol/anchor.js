"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOverseerConfig = void 0;
const queryOverseerConfig = ({ lcd, overseer }) => async (addressProvider) => {
    const overseerContractAddress = addressProvider.overseer(overseer);
    let response = await lcd.wasm.contractQuery(overseerContractAddress, {
        config: {},
    });
    return response;
};
exports.queryOverseerConfig = queryOverseerConfig;

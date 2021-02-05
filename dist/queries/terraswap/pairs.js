"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPair = void 0;
const queryPair = ({ lcd }) => async (addressProvider) => {
    const pairContractAddress = addressProvider.blunaBurnPair();
    let reponse = await lcd.wasm.contractQuery(pairContractAddress, {
        pair: {},
    });
    return reponse;
};
exports.queryPair = queryPair;

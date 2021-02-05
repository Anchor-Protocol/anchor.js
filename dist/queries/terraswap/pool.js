"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPool = void 0;
const queryPool = ({ lcd }) => async (addressProvider) => {
    const pairContractAddress = addressProvider.blunaBurnPair();
    let reponse = await lcd.wasm.contractQuery(pairContractAddress, {
        pool: {},
    });
    return reponse;
};
exports.queryPool = queryPool;

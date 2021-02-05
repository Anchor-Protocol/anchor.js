"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryReverseTokenSimulation = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const queryReverseTokenSimulation = ({ lcd, contractAddr, amount, }) => async (addressProvider) => {
    const pairContractAddress = addressProvider.blunaBurnPair();
    let reponse = await lcd.wasm.contractQuery(pairContractAddress, {
        reverse_simulation: {
            ask_asset: {
                info: {
                    token: {
                        contract_addr: contractAddr,
                    },
                },
                amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
            },
        },
    });
    return reponse;
};
exports.queryReverseTokenSimulation = queryReverseTokenSimulation;

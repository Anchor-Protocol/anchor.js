"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySimulation = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const querySimulation = ({ lcd, contractAddr, amount, }) => async (addressProvider) => {
    const pairContractAddress = addressProvider.blunaBurnPair();
    let reponse = await lcd.wasm.contractQuery(pairContractAddress, {
        simulation: {
            offer_asset: {
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
exports.querySimulation = querySimulation;

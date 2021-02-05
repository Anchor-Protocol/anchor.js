"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebMarketRegOverseer = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebMarketRegOverseer = ({ address, overseer_contract, market, }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address), address_1.validateAddress(overseer_contract)]);
    const mmMarket = addressProvider.market(market);
    return [
        new terra_js_1.MsgExecuteContract(address, mmMarket, {
            register_overseer: {
                overseer_contract: overseer_contract,
            },
        }),
    ];
};
exports.fabricatebMarketRegOverseer = fabricatebMarketRegOverseer;

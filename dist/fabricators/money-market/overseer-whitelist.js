"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOverseerWhiteList = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebOverseerWhiteList = ({ address, overseer, collateral_token, custody_contract, ltv, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        address_1.validateAddress(collateral_token),
        address_1.validateAddress(custody_contract),
    ]);
    const mmOverseer = addressProvider.overseer(overseer);
    return [
        new terra_js_1.MsgExecuteContract(address, mmOverseer, {
            whitelist: {
                collateral_token: collateral_token,
                custody_contract: custody_contract,
                ltv: ltv,
            },
        }),
    ];
};
exports.fabricatebOverseerWhiteList = fabricatebOverseerWhiteList;

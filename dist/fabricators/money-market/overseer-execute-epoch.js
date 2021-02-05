"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOverseerEpoch = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebOverseerEpoch = ({ address, overseer }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address)]);
    const mmOverseer = addressProvider.overseer(overseer);
    return [
        new terra_js_1.MsgExecuteContract(address, mmOverseer, {
            execute_epoch_operations: {},
        }),
    ];
};
exports.fabricatebOverseerEpoch = fabricatebOverseerEpoch;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOverseerEpoch = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebOverseerEpoch = function (_a) {
    var address = _a.address, overseer = _a.overseer;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address)]);
        var mmOverseer = addressProvider.overseer(overseer);
        return [
            new terra_js_1.MsgExecuteContract(address, mmOverseer, {
                execute_epoch_operations: {},
            }),
        ];
    };
};
exports.fabricatebOverseerEpoch = fabricatebOverseerEpoch;
//# sourceMappingURL=overseer-execute-epoch.js.map
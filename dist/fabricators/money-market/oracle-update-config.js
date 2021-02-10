"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOracleConfig = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var fabricatebOracleConfig = function (_a) {
    var address = _a.address, owner = _a.owner;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            owner ? address_1.validateAddress(owner) : true_1.validateTrue,
        ]);
        var mmOracle = addressProvider.oracle();
        return [
            new terra_js_1.MsgExecuteContract(address, mmOracle, {
                update_config: {
                    owner: owner,
                },
            }),
        ];
    };
};
exports.fabricatebOracleConfig = fabricatebOracleConfig;
//# sourceMappingURL=oracle-update-config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebInterestConfig = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var fabricatebInterestConfig = function (_a) {
    var address = _a.address, owner = _a.owner, base_rate = _a.base_rate, interest_multiplier = _a.interest_multiplier;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            owner ? address_1.validateAddress(owner) : true_1.validateTrue,
        ]);
        var mmInterest = addressProvider.interest();
        return [
            new terra_js_1.MsgExecuteContract(address, mmInterest, {
                update_config: {
                    owner: owner,
                    base_rate: base_rate,
                    interest_multiplier: interest_multiplier,
                },
            }),
        ];
    };
};
exports.fabricatebInterestConfig = fabricatebInterestConfig;
//# sourceMappingURL=interest-update-config.js.map
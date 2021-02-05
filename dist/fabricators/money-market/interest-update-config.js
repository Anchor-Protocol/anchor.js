"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebInterestConfig = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const true_1 = require("../../utils/validation/true");
const fabricatebInterestConfig = ({ address, owner, base_rate, interest_multiplier, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        owner ? address_1.validateAddress(owner) : true_1.validateTrue,
    ]);
    const mmInterest = addressProvider.interest();
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
exports.fabricatebInterestConfig = fabricatebInterestConfig;

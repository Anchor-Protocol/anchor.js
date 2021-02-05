"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOracleConfig = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const true_1 = require("../../utils/validation/true");
const fabricatebOracleConfig = ({ address, owner }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        owner ? address_1.validateAddress(owner) : true_1.validateTrue,
    ]);
    const mmOracle = addressProvider.oracle();
    return [
        new terra_js_1.MsgExecuteContract(address, mmOracle, {
            update_config: {
                owner: owner,
            },
        }),
    ];
};
exports.fabricatebOracleConfig = fabricatebOracleConfig;

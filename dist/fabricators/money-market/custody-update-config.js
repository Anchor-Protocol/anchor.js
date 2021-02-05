"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebCustodyConfig = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const true_1 = require("../../utils/validation/true");
const fabricatebCustodyConfig = ({ address, liquidation_contract, custody, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        liquidation_contract ? address_1.validateAddress(liquidation_contract) : true_1.validateTrue,
    ]);
    const mmCustody = addressProvider.custody(custody);
    return [
        new terra_js_1.MsgExecuteContract(address, mmCustody, {
            update_config: {
                liquidation_contract: liquidation_contract,
            },
        }),
    ];
};
exports.fabricatebCustodyConfig = fabricatebCustodyConfig;

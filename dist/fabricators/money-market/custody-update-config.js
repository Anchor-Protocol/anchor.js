"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebCustodyConfig = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var fabricatebCustodyConfig = function (_a) {
    var address = _a.address, liquidation_contract = _a.liquidation_contract, custody = _a.custody;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            liquidation_contract ? address_1.validateAddress(liquidation_contract) : true_1.validateTrue,
        ]);
        var mmCustody = addressProvider.custody(custody);
        return [
            new terra_js_1.MsgExecuteContract(address, mmCustody, {
                update_config: {
                    liquidation_contract: liquidation_contract,
                },
            }),
        ];
    };
};
exports.fabricatebCustodyConfig = fabricatebCustodyConfig;
//# sourceMappingURL=custody-update-config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOverseerUpWhiteList = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var fabricatebOverseerUpWhiteList = function (_a) {
    var address = _a.address, overseer = _a.overseer, collateral_token = _a.collateral_token, custody_contract = _a.custody_contract, ltv = _a.ltv;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            address_1.validateAddress(collateral_token),
            custody_contract ? address_1.validateAddress(custody_contract) : true_1.validateTrue,
        ]);
        var mmOverseer = addressProvider.overseer(overseer);
        return [
            new terra_js_1.MsgExecuteContract(address, mmOverseer, {
                update_whitelist: {
                    collateral_token: collateral_token,
                    custody_contract: custody_contract,
                    ltv: ltv,
                },
            }),
        ];
    };
};
exports.fabricatebOverseerUpWhiteList = fabricatebOverseerUpWhiteList;
//# sourceMappingURL=overseer-update-whitelist.js.map
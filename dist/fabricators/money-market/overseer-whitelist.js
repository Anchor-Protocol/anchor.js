"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOverseerWhiteList = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebOverseerWhiteList = function (_a) {
    var address = _a.address, overseer = _a.overseer, collateral_token = _a.collateral_token, custody_contract = _a.custody_contract, ltv = _a.ltv;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            address_1.validateAddress(collateral_token),
            address_1.validateAddress(custody_contract),
        ]);
        var mmOverseer = addressProvider.overseer(overseer);
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
};
exports.fabricatebOverseerWhiteList = fabricatebOverseerWhiteList;
//# sourceMappingURL=overseer-whitelist.js.map
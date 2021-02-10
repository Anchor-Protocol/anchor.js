"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebCheckSlashing = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebCheckSlashing = function (_a) {
    var address = _a.address, bAsset = _a.bAsset;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address)]);
        var bAssetHubAddress = addressProvider.bAssetHub(bAsset);
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetHubAddress, {
                check_slashing: {},
            }),
        ];
    };
};
exports.fabricatebCheckSlashing = fabricatebCheckSlashing;
//# sourceMappingURL=basset-check-slashing.js.map
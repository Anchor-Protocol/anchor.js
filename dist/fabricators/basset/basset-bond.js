"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetBond = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var fabricatebAssetBond = function (_a) {
    var address = _a.address, amount = _a.amount, bAsset = _a.bAsset, validator = _a.validator;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            address_1.validateValAddress(validator),
            number_1.validateIsGreaterThanZero(amount),
        ]);
        // const nativeTokenDenom = bAssetToNative.bluna[bAsset.toLowerCase()]
        var bAssetContractAddress = addressProvider.bAssetHub(bAsset);
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetContractAddress, {
                bond: {
                    validator: validator,
                },
            }, 
            // send native token
            {
                uluna: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
            }),
        ];
    };
};
exports.fabricatebAssetBond = fabricatebAssetBond;
//# sourceMappingURL=basset-bond.js.map
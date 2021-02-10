"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateDeRegisterValidator = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
/**
 * @param address Client’s Terra address.
 */
var fabricateDeRegisterValidator = function (_a) {
    var address = _a.address, validatorAddress = _a.validatorAddress;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateValAddress(validatorAddress)]);
        var bAssetHubAddress = addressProvider.bAssetHub('bluna');
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetHubAddress, {
                deregister_validator: {
                    validator: validatorAddress,
                },
            }),
        ];
    };
};
exports.fabricateDeRegisterValidator = fabricateDeRegisterValidator;
//# sourceMappingURL=basset-deregister-validator.js.map
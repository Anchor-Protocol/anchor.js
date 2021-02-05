"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateDeRegisterValidator = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
/**
 * @param address Client’s Terra address.
 */
const fabricateDeRegisterValidator = ({ address, validatorAddress, }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateValAddress(validatorAddress)]);
    const bAssetHubAddress = addressProvider.bAssetHub('bluna');
    return [
        new terra_js_1.MsgExecuteContract(address, bAssetHubAddress, {
            deregister_validator: {
                validator: validatorAddress,
            },
        }),
    ];
};
exports.fabricateDeRegisterValidator = fabricateDeRegisterValidator;

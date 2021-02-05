"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetBond = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const fabricatebAssetBond = ({ address, amount, bAsset, validator, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        address_1.validateValAddress(validator),
        number_1.validateIsGreaterThanZero(amount),
    ]);
    // const nativeTokenDenom = bAssetToNative.bluna[bAsset.toLowerCase()]
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
    return [
        new terra_js_1.MsgExecuteContract(address, bAssetContractAddress, {
            bond: {
                validator,
            },
        }, 
        // send native token
        {
            uluna: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
        }),
    ];
};
exports.fabricatebAssetBond = fabricatebAssetBond;

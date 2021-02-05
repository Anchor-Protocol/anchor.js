"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetUpdateGlobalIndex = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebAssetUpdateGlobalIndex = ({ address, bAsset, }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address)]);
    const bAssetHubAddress = addressProvider.bAssetHub(bAsset);
    return [
        new terra_js_1.MsgExecuteContract(address, bAssetHubAddress, {
            update_global_index: {},
        }),
    ];
};
exports.fabricatebAssetUpdateGlobalIndex = fabricatebAssetUpdateGlobalIndex;

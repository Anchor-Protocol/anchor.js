"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetConfig = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var fabricatebAssetConfig = function (_a) {
    var address = _a.address, owner = _a.owner, reward_contract = _a.reward_contract, token_contract = _a.token_contract, bAsset = _a.bAsset;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            reward_contract ? address_1.validateAddress(reward_contract) : true_1.validateTrue,
            token_contract ? address_1.validateAddress(token_contract) : true_1.validateTrue,
        ]);
        // const nativeTokenDenom = bAssetToNative.bluna[bAsset.toLowerCase()]
        var bAssetContractAddress = addressProvider.bAssetHub(bAsset);
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetContractAddress, {
                update_config: {
                    owner: owner,
                    reward_contract: reward_contract,
                    token_contract: token_contract,
                },
            }),
        ];
    };
};
exports.fabricatebAssetConfig = fabricatebAssetConfig;
//# sourceMappingURL=basset-update-config.js.map
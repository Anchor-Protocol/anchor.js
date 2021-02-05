"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetConfig = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const true_1 = require("../../utils/validation/true");
const fabricatebAssetConfig = ({ address, owner, reward_contract, token_contract, bAsset, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        reward_contract ? address_1.validateAddress(reward_contract) : true_1.validateTrue,
        token_contract ? address_1.validateAddress(token_contract) : true_1.validateTrue,
    ]);
    // const nativeTokenDenom = bAssetToNative.bluna[bAsset.toLowerCase()]
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
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
exports.fabricatebAssetConfig = fabricatebAssetConfig;

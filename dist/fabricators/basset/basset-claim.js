"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetClaim = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebAssetClaim = ({ address, bAsset, recipient, }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address)]);
    const bAssetRewardAddress = addressProvider.bAssetReward(bAsset);
    return [
        new terra_js_1.MsgExecuteContract(address, bAssetRewardAddress, {
            // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/master/contracts/anchor_basset_reward/src/msg.rs#L46
            // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/master/contracts/anchor_basset_reward/src/user.rs#L16
            claim_rewards: {
                recipient,
            },
        }),
    ];
};
exports.fabricatebAssetClaim = fabricatebAssetClaim;

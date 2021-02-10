"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetClaim = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebAssetClaim = function (_a) {
    var address = _a.address, bAsset = _a.bAsset, recipient = _a.recipient;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address)]);
        var bAssetRewardAddress = addressProvider.bAssetReward(bAsset);
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetRewardAddress, {
                // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/master/contracts/anchor_basset_reward/src/msg.rs#L46
                // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/master/contracts/anchor_basset_reward/src/user.rs#L16
                claim_rewards: {
                    recipient: recipient,
                },
            }),
        ];
    };
};
exports.fabricatebAssetClaim = fabricatebAssetClaim;
//# sourceMappingURL=basset-claim.js.map
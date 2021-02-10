"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetBurn = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
var fabricatebAssetBurn = function (_a) {
    var address = _a.address, amount = _a.amount, bAsset = _a.bAsset;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            number_1.validateIsNumber(amount),
            number_1.validateIsGreaterThanZero(+amount),
        ]);
        var bAssetTokenAddress = addressProvider.bAssetToken(bAsset);
        var bAssetHubAddress = addressProvider.bAssetHub(bAsset);
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetTokenAddress, {
                // @see https://github.com/Anchor-Protocol/anchor-bAsset-contracts/blob/cce41e707c67ee2852c4929e17fb1472dbd2aa35/contracts/anchor_basset_token/src/handler.rs#L101
                send: {
                    contract: bAssetHubAddress,
                    amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                    msg: create_hook_msg_1.createHookMsg({
                        unbond: {},
                    }),
                },
            }),
        ];
    };
};
exports.fabricatebAssetBurn = fabricatebAssetBurn;
// new MsgExecuteContract(
//   address,
//   bAssetGovAddress,
//   {
//     finish_burn: {}
//   }
// )
//# sourceMappingURL=basset-unbond.js.map
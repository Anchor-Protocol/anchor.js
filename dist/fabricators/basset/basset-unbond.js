"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetBurn = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
const fabricatebAssetBurn = ({ address, amount, bAsset }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        number_1.validateIsNumber(amount),
        number_1.validateIsGreaterThanZero(+amount),
    ]);
    const bAssetTokenAddress = addressProvider.bAssetToken(bAsset);
    const bAssetHubAddress = addressProvider.bAssetHub(bAsset);
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
exports.fabricatebAssetBurn = fabricatebAssetBurn;
// new MsgExecuteContract(
//   address,
//   bAssetGovAddress,
//   {
//     finish_burn: {}
//   }
// )

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebSwapbLuna = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
var fabricatebSwapbLuna = function (_a) {
    var address = _a.address, amount = _a.amount, bAsset = _a.bAsset, to = _a.to, beliefPrice = _a.beliefPrice, maxSpread = _a.maxSpread;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            number_1.validateIsNumber(amount),
            number_1.validateIsGreaterThanZero(+amount),
        ]);
        var bAssetTokenAddress = addressProvider.bAssetToken(bAsset);
        var pairAddress = addressProvider.blunaUlunaPair();
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetTokenAddress, {
                send: {
                    contract: pairAddress,
                    amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                    msg: create_hook_msg_1.createHookMsg({
                        swap: {
                            belief_price: beliefPrice,
                            max_spread: maxSpread,
                            to: to,
                        },
                    }),
                },
            }),
        ];
    };
};
exports.fabricatebSwapbLuna = fabricatebSwapbLuna;
//# sourceMappingURL=swap.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebSwapLuna = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var fabricatebSwapLuna = function (_a) {
    var address = _a.address, amount = _a.amount, to = _a.to, beliefPrice = _a.beliefPrice, maxSpread = _a.maxSpread, denom = _a.denom;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            number_1.validateIsNumber(amount),
            number_1.validateIsGreaterThanZero(+amount),
        ]);
        var coins = new terra_js_1.Coins([
            new terra_js_1.Coin(denom, new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()),
        ]);
        var pairAddress = addressProvider.blunaUlunaPair();
        return [
            new terra_js_1.MsgExecuteContract(address, pairAddress, {
                swap: {
                    offer_asset: {
                        info: {
                            native_token: {
                                denom: denom,
                            },
                        },
                        amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                    },
                    belief_price: beliefPrice,
                    max_spread: maxSpread,
                    to: to,
                },
            }, coins),
        ];
    };
};
exports.fabricatebSwapLuna = fabricatebSwapLuna;
//# sourceMappingURL=swap-native.js.map
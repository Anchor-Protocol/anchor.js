"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateRedeemStable = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var address_1 = require("../../utils/validation/address");
var validate_input_1 = require("../../utils/validate-input");
var number_1 = require("../../utils/validation/number");
var create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
/**
 * @param address Client’s Terra address.
 * @param symbol Symbol of stablecoin to redeem, or its aToken equivalent.
 * @param amount Amount of a stablecoin to redeem, or amount of an aToken (aTerra) to redeem (specified by symbol).
 */
var fabricateRedeemStable = function (_a) {
    var address = _a.address, symbol = _a.symbol, amount = _a.amount;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address), number_1.validateIsGreaterThanZero(amount)]);
        var marketAddress = addressProvider.market(symbol);
        var aTokenAddress = addressProvider.aToken(symbol);
        return [
            new terra_js_1.MsgExecuteContract(address, aTokenAddress, {
                send: {
                    contract: marketAddress,
                    amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                    msg: create_hook_msg_1.createHookMsg({
                        redeem_stable: {},
                    }),
                },
            }),
        ];
    };
};
exports.fabricateRedeemStable = fabricateRedeemStable;
//# sourceMappingURL=market-redeem-stable.js.map
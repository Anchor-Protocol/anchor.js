"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateDepositStableCoin = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var stable_1 = require("../../utils/validation/stable");
/**
 *
 * @param address Client’s Terra address.
 * @param symbol Symbol of a stablecoin to deposit.
 * @param amount Amount of a stablecoin to deposit.
 */
var fabricateDepositStableCoin = function (_a) {
    var address = _a.address, symbol = _a.symbol, amount = _a.amount;
    return function (addressProvider) {
        var _a;
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            stable_1.validateWhitelistedStable(symbol),
            number_1.validateIsGreaterThanZero(amount),
        ]);
        var nativeTokenDenom = symbol;
        var mmContractAddress = addressProvider.market(symbol);
        return [
            new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L65
                deposit_stable: {},
            }, (_a = {},
                _a["u" + nativeTokenDenom] = new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                _a)),
        ];
    };
};
exports.fabricateDepositStableCoin = fabricateDepositStableCoin;
//# sourceMappingURL=market-deposit-stable.js.map
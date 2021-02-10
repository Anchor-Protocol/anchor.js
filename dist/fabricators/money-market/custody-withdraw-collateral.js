"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateCustodyWithdrawCollateral = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var address_1 = require("../../utils/validation/address");
var validate_input_1 = require("../../utils/validate-input");
var true_1 = require("../../utils/validation/true");
var number_1 = require("../../utils/validation/number");
var amount_1 = require("../../utils/validation/amount");
/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to redeem collateral.
 * @param symbol Symbol of collateral to redeem.
 * @param redeem_all Set this to true to redeem all symbol collateral deposited to loan_id.
 * @param amount (optional) Amount of collateral to redeem. Set this to null if redeem_all is true.
 * @param withdraw_to (optional) Terra address to withdraw redeemed collateral. If null, withdraws to address.
 */
var fabricateCustodyWithdrawCollateral = function (_a) {
    var address = _a.address, market = _a.market, _b = _a.amount, amount = _b === void 0 ? undefined : _b;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            amount ? number_1.validateIsGreaterThanZero(amount) : true_1.validateTrue,
        ]);
        var custodyContract = addressProvider.custody(market.toLocaleLowerCase());
        return [
            // withdraw from custody
            // withdraw from custody
            new terra_js_1.MsgExecuteContract(address, custodyContract, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/custody/src/msg.rs#L69
                withdraw_collateral: {
                    amount: amount_1.isAmountSet(amount)
                        ? new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()
                        : undefined,
                },
            }),
        ];
    };
};
exports.fabricateCustodyWithdrawCollateral = fabricateCustodyWithdrawCollateral;
//# sourceMappingURL=custody-withdraw-collateral.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateRetractBid = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var address_1 = require("../../utils/validation/address");
var validate_input_1 = require("../../utils/validate-input");
var number_1 = require("../../utils/validation/number");
var true_1 = require("../../utils/validation/true");
var amount_1 = require("../../utils/validation/amount");
var fabricateRetractBid = function (_a) {
    var address = _a.address, collateral_token = _a.collateral_token, amount = _a.amount;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            address_1.validateAddress(collateral_token),
            amount ? number_1.validateIsNumber(amount) : true_1.validateTrue,
        ]);
        var mmContractAddress = addressProvider.liquidation();
        return [
            new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/781abf462dc25aaed0ea4953dad14ba9736fa55d/contracts/liquidation/src/bid.rs#L15
                retract_bid: {
                    collateral_token: collateral_token,
                    amount: amount_1.isAmountSet(amount)
                        ? new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()
                        : undefined,
                },
            }),
        ];
    };
};
exports.fabricateRetractBid = fabricateRetractBid;
//# sourceMappingURL=liquidation-retract-bid.js.map
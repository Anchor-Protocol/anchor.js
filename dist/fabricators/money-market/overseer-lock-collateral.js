"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateOverseerLockCollateral = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to deposit collateral. Currently only supports UST and KRT.
 //  * @param borrower (optional) — Terra address of the entity that created the loan position. If null, adds collateral to address‘s loan position.
 * @param loan_id ID of address’s loan position to add collateral. For each addresses, their first loan position is given ID = 0, second loan ID = 1, third ID = 2, etc.. If this field is [(address’s current highest loan_id) + 1], a new loan position is created.
 * @param symbol Symbol of collateral to deposit.
 * @param amount Amount of collateral to deposit.
 */
var fabricateOverseerLockCollateral = function (_a) {
    var address = _a.address, market = _a.market, amount = _a.amount;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address), number_1.validateIsGreaterThanZero(amount)]);
        var mmOverseerContract = addressProvider.overseer(market.toLowerCase());
        return [
            // lock_collateral call
            new terra_js_1.MsgExecuteContract(address, mmOverseerContract, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L75
                lock_collateral: {
                    collaterals: [
                        [address, new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()],
                    ],
                },
            }),
        ];
    };
};
exports.fabricateOverseerLockCollateral = fabricateOverseerLockCollateral;
//# sourceMappingURL=overseer-lock-collateral.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateBorrow = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const address_1 = require("../../utils/validation/address");
const validate_input_1 = require("../../utils/validate-input");
const number_1 = require("../../utils/validation/number");
const number_2 = require("../../utils/validation/number");
/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to borrow.
 * @param loan_id ID of address’s loan position to add borrows.
 * @param amount Amount of stablecoin to borrow.
 * @param withdraw_to (optional) Terra address to withdraw borrowed stablecoin. If null, withdraws to address
 */
const fabricateBorrow = ({ address, market, amount, withdrawTo, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        number_1.validateIsNumber(amount),
        number_2.validateIsGreaterThanZero(amount),
    ]);
    const mmContractAddress = addressProvider.market(market);
    return [
        new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
            // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L68
            borrow_stable: {
                borrow_amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                to: withdrawTo || undefined,
            },
        }),
    ];
};
exports.fabricateBorrow = fabricateBorrow;

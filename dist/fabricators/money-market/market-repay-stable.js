"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateRepay = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const address_1 = require("../../utils/validation/address");
const validate_input_1 = require("../../utils/validate-input");
const number_1 = require("../../utils/validation/number");
const true_1 = require("../../utils/validation/true");
/**
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to repay.
 * @param borrower (optional) Terra address of the entity that created the loan position.If null, repays address‘s loan
 * @param amount (optional) Amount of stablecoin to repay. Set to null if repay_all is set to true.
 */
const fabricateRepay = ({ address, market, borrower, amount, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        borrower ? address_1.validateAddress(borrower) : true_1.validateTrue,
        number_1.validateIsGreaterThanZero(amount),
    ]);
    //const nativeTokenDenom = market;
    const mmContractAddress = addressProvider.market(market);
    return [
        new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
            // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L74
            repay_stable: {},
        }, 
        // sending stablecoin
        {
            uusd: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
        }),
    ];
};
exports.fabricateRepay = fabricateRepay;

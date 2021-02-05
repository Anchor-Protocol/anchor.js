"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateRetractBid = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const address_1 = require("../../utils/validation/address");
const validate_input_1 = require("../../utils/validate-input");
const number_1 = require("../../utils/validation/number");
const true_1 = require("../../utils/validation/true");
const amount_1 = require("../../utils/validation/amount");
const fabricateRetractBid = ({ address, collateral_token, amount, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        address_1.validateAddress(collateral_token),
        amount ? number_1.validateIsNumber(amount) : true_1.validateTrue,
    ]);
    const mmContractAddress = addressProvider.liquidation();
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
exports.fabricateRetractBid = fabricateRetractBid;

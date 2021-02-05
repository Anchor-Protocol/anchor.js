"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateRedeemStable = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const address_1 = require("../../utils/validation/address");
const validate_input_1 = require("../../utils/validate-input");
const number_1 = require("../../utils/validation/number");
const create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
/**
 * @param address Client’s Terra address.
 * @param symbol Symbol of stablecoin to redeem, or its aToken equivalent.
 * @param amount Amount of a stablecoin to redeem, or amount of an aToken (aTerra) to redeem (specified by symbol).
 */
const fabricateRedeemStable = ({ address, symbol, amount }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address), number_1.validateIsGreaterThanZero(amount)]);
    const marketAddress = addressProvider.market(symbol);
    const aTokenAddress = addressProvider.aToken(symbol);
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
exports.fabricateRedeemStable = fabricateRedeemStable;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebSwapbLuna = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
const fabricatebSwapbLuna = ({ address, amount, bAsset, to, beliefPrice, maxSpread, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        number_1.validateIsNumber(amount),
        number_1.validateIsGreaterThanZero(+amount),
    ]);
    const bAssetTokenAddress = addressProvider.bAssetToken(bAsset);
    const pairAddress = addressProvider.blunaBurnPair();
    return [
        new terra_js_1.MsgExecuteContract(address, bAssetTokenAddress, {
            send: {
                contract: pairAddress,
                amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                msg: create_hook_msg_1.createHookMsg({
                    swap: {
                        belief_price: beliefPrice,
                        max_spread: maxSpread,
                        to: to,
                    },
                }),
            },
        }),
    ];
};
exports.fabricatebSwapbLuna = fabricatebSwapbLuna;

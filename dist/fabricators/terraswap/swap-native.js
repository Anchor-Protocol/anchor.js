"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebSwapLuna = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const fabricatebSwapLuna = ({ address, amount, to, beliefPrice, maxSpread, denom, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        number_1.validateIsNumber(amount),
        number_1.validateIsGreaterThanZero(+amount),
    ]);
    const coins = new terra_js_1.Coins([
        new terra_js_1.Coin(denom, new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()),
    ]);
    const pairAddress = addressProvider.blunaBurnPair();
    return [
        new terra_js_1.MsgExecuteContract(address, pairAddress, {
            swap: {
                offer_asset: {
                    info: {
                        native_token: {
                            denom: denom,
                        },
                    },
                    amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                },
                belief_price: beliefPrice,
                max_spread: maxSpread,
                to: to,
            },
        }, coins),
    ];
};
exports.fabricatebSwapLuna = fabricatebSwapLuna;

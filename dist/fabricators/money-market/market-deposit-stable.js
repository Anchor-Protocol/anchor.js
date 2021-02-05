"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateDepositStableCoin = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const stable_1 = require("../../utils/validation/stable");
/**
 *
 * @param address Client’s Terra address.
 * @param symbol Symbol of a stablecoin to deposit.
 * @param amount Amount of a stablecoin to deposit.
 */
const fabricateDepositStableCoin = ({ address, symbol, amount, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        stable_1.validateWhitelistedStable(symbol),
        number_1.validateIsGreaterThanZero(amount),
    ]);
    const nativeTokenDenom = symbol;
    const mmContractAddress = addressProvider.market(symbol);
    return [
        new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
            // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/market/src/msg.rs#L65
            deposit_stable: {},
        }, 
        // coins
        {
            [`u${nativeTokenDenom}`]: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
        }),
    ];
};
exports.fabricateDepositStableCoin = fabricateDepositStableCoin;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateLiquidationConfig = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const address_1 = require("../../utils/validation/address");
const validate_input_1 = require("../../utils/validate-input");
const true_1 = require("../../utils/validation/true");
const number_1 = require("../../utils/validation/number");
const fabricateLiquidationConfig = ({ address, owner, oracle_contract, stable_denom, safe_ratio, bid_fee, max_premium_rate, liquidation_threshold, price_timeframe, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        owner ? address_1.validateAddress(owner) : true_1.validateTrue,
        oracle_contract ? address_1.validateAddress(oracle_contract) : true_1.validateTrue,
        liquidation_threshold
            ? number_1.validateIsNumber(liquidation_threshold)
            : true_1.validateTrue,
        price_timeframe ? number_1.validateIsNumber(price_timeframe) : true_1.validateTrue,
    ]);
    const mmContractAddress = addressProvider.liquidation();
    return [
        new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
            update_config: {
                owner: owner,
                oracle_contract: oracle_contract,
                stable_denom: stable_denom,
                safe_ratio: safe_ratio,
                bid_fee: bid_fee,
                max_premium_rate: max_premium_rate,
                liquidation_threshold: liquidation_threshold,
                price_timeframe: price_timeframe,
            },
        }),
    ];
};
exports.fabricateLiquidationConfig = fabricateLiquidationConfig;

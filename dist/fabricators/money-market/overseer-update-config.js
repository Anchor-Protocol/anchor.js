"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOverseerConfig = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var number_1 = require("../../utils/validation/number");
var fabricatebOverseerConfig = function (_a) {
    var address = _a.address, overseer = _a.overseer, owner_addr = _a.owner_addr, oracle_contract = _a.oracle_contract, liquidation_contract = _a.liquidation_contract, distribution_threshold = _a.distribution_threshold, target_deposit_rate = _a.target_deposit_rate, buffer_distribution_rate = _a.buffer_distribution_rate, epoch_period = _a.epoch_period, price_timeframe = _a.price_timeframe;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            owner_addr ? address_1.validateAddress(owner_addr) : true_1.validateTrue,
            oracle_contract ? address_1.validateAddress(oracle_contract) : true_1.validateTrue,
            liquidation_contract ? address_1.validateAddress(liquidation_contract) : true_1.validateTrue,
            epoch_period ? number_1.validateIsNumber(epoch_period) : true_1.validateTrue,
            epoch_period ? number_1.validateIsNumber(epoch_period) : true_1.validateTrue,
        ]);
        var mmOverseer = addressProvider.overseer(overseer);
        return [
            new terra_js_1.MsgExecuteContract(address, mmOverseer, {
                update_config: {
                    owner_addr: owner_addr,
                    oracle_contract: oracle_contract,
                    liquidation_contract: liquidation_contract,
                    distribution_threshold: distribution_threshold,
                    target_deposit_rate: target_deposit_rate,
                    buffer_distribution_rate: buffer_distribution_rate,
                    epoch_period: epoch_period,
                    price_timeframe: price_timeframe,
                },
            }),
        ];
    };
};
exports.fabricatebOverseerConfig = fabricatebOverseerConfig;
//# sourceMappingURL=overseer-update-config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebMarketConfig = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var true_1 = require("../../utils/validation/true");
var fabricatebMarketConfig = function (_a) {
    var address = _a.address, owner_addr = _a.owner_addr, interest_model = _a.interest_model, distribution_model = _a.distribution_model, reserve_factor = _a.reserve_factor, max_borrow_factor = _a.max_borrow_factor, market = _a.market;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            owner_addr ? address_1.validateAddress(owner_addr) : true_1.validateTrue,
            interest_model ? address_1.validateAddress(interest_model) : true_1.validateTrue,
        ]);
        var mmMarket = addressProvider.market(market);
        return [
            new terra_js_1.MsgExecuteContract(address, mmMarket, {
                update_config: {
                    owner_addr: owner_addr,
                    interest_model: interest_model,
                    distribution_model: distribution_model,
                    reserve_factor: reserve_factor,
                    max_borrow_factor: max_borrow_factor,
                },
            }),
        ];
    };
};
exports.fabricatebMarketConfig = fabricatebMarketConfig;
//# sourceMappingURL=market-update-config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebMarketConfig = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const true_1 = require("../../utils/validation/true");
const fabricatebMarketConfig = ({ address, owner_addr, interest_model, reserve_factor, market, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        owner_addr ? address_1.validateAddress(owner_addr) : true_1.validateTrue,
        interest_model ? address_1.validateAddress(interest_model) : true_1.validateTrue,
    ]);
    const mmMarket = addressProvider.market(market);
    return [
        new terra_js_1.MsgExecuteContract(address, mmMarket, {
            update_config: {
                owner_addr: owner_addr,
                interest_model: interest_model,
                reserve_factor: reserve_factor,
            },
        }),
    ];
};
exports.fabricatebMarketConfig = fabricatebMarketConfig;

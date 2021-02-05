"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOracleFeedPrice = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebOracleFeedPrice = ({ address, prices }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address)]);
    const mmOracle = addressProvider.oracle();
    return [
        new terra_js_1.MsgExecuteContract(address, mmOracle, {
            feed_price: {
                prices: prices,
            },
        }),
    ];
};
exports.fabricatebOracleFeedPrice = fabricatebOracleFeedPrice;

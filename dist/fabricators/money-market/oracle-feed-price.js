"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebOracleFeedPrice = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebOracleFeedPrice = function (_a) {
    var address = _a.address, prices = _a.prices;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address)]);
        var mmOracle = addressProvider.oracle();
        return [
            new terra_js_1.MsgExecuteContract(address, mmOracle, {
                feed_price: {
                    prices: prices,
                },
            }),
        ];
    };
};
exports.fabricatebOracleFeedPrice = fabricatebOracleFeedPrice;
//# sourceMappingURL=oracle-feed-price.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebMarketRegOverseer = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebMarketRegOverseer = function (_a) {
    var address = _a.address, overseer_contract = _a.overseer_contract, market = _a.market;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address), address_1.validateAddress(overseer_contract)]);
        var mmMarket = addressProvider.market(market);
        return [
            new terra_js_1.MsgExecuteContract(address, mmMarket, {
                register_overseer: {
                    overseer_contract: overseer_contract,
                },
            }),
        ];
    };
};
exports.fabricatebMarketRegOverseer = fabricatebMarketRegOverseer;
//# sourceMappingURL=market-register-overseer.js.map
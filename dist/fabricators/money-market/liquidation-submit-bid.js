"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateSubmitBid = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var address_1 = require("../../utils/validation/address");
var validate_input_1 = require("../../utils/validate-input");
var fabricateSubmitBid = function (_a) {
    var address = _a.address, collateral_token = _a.collateral_token, premium_rate = _a.premium_rate;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            address_1.validateAddress(collateral_token),
        ]);
        var mmContractAddress = addressProvider.liquidation();
        return [
            new terra_js_1.MsgExecuteContract(address, mmContractAddress, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/781abf462dc25aaed0ea4953dad14ba9736fa55d/contracts/liquidation/src/bid.rs#L15
                submit_bid: {
                    collateral_token: collateral_token,
                    premium_rate: premium_rate,
                },
            }),
        ];
    };
};
exports.fabricateSubmitBid = fabricateSubmitBid;
//# sourceMappingURL=liquidation-submit-bid.js.map
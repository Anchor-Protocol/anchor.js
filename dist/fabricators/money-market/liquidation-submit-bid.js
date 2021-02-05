"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateSubmitBid = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const address_1 = require("../../utils/validation/address");
const validate_input_1 = require("../../utils/validate-input");
const fabricateSubmitBid = ({ address, collateral_token, premium_rate, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        address_1.validateAddress(collateral_token),
    ]);
    const mmContractAddress = addressProvider.liquidation();
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
exports.fabricateSubmitBid = fabricateSubmitBid;

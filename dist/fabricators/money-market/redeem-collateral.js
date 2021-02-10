"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateRedeemCollateral = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var address_1 = require("../../utils/validation/address");
var validate_input_1 = require("../../utils/validate-input");
var market_1 = require("../../utils/validation/market");
var true_1 = require("../../utils/validation/true");
var number_1 = require("../../utils/validation/number");
var amount_1 = require("../../utils/validation/amount");
/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to redeem collateral.
 * @param symbol Symbol of collateral to redeem.
 * @param amount (optional) Amount of collateral to redeem. Set this to null if redeem_all is true.
 * @param withdraw_to (optional) Terra address to withdraw redeemed collateral. If null, withdraws to address.
 */
var fabricateRedeemCollateral = function (_a) {
    var address = _a.address, market = _a.market, amount = _a.amount;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            market_1.validateWhitelistedMarket(market),
            amount ? number_1.validateIsGreaterThanZero(amount) : true_1.validateTrue,
        ]);
        var mmOverseerContract = addressProvider.overseer(market.toLowerCase());
        var bAssetTokenContract = addressProvider.bAssetToken('ubluna'); // fixed to ubluna for now
        var custodyContract = addressProvider.custody(market.toLocaleLowerCase());
        return [
            // unlock collateral
            new terra_js_1.MsgExecuteContract(address, mmOverseerContract, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L78
                unlock_collateral: {
                    collaterals: [
                        [
                            bAssetTokenContract,
                            amount_1.isAmountSet(amount)
                                ? new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()
                                : undefined,
                        ],
                    ],
                },
            }),
            // withdraw from custody
            new terra_js_1.MsgExecuteContract(address, custodyContract, {
                // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/custody/src/msg.rs#L69
                withdraw_collateral: {
                    amount: amount_1.isAmountSet(amount)
                        ? new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString()
                        : undefined,
                },
            }),
        ];
    };
};
exports.fabricateRedeemCollateral = fabricateRedeemCollateral;
//# sourceMappingURL=redeem-collateral.js.map
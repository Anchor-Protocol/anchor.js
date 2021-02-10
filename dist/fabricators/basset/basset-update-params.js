"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetParams = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var true_1 = require("../../utils/validation/true");
var fabricatebAssetParams = function (_a) {
    var address = _a.address, epoch_period = _a.epoch_period, underlying_coin_denom = _a.underlying_coin_denom, unbonding_period = _a.unbonding_period, peg_recovery_fee = _a.peg_recovery_fee, er_threshold = _a.er_threshold, reward_denom = _a.reward_denom, bAsset = _a.bAsset;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            epoch_period ? number_1.validateIsNumber(epoch_period) : true_1.validateTrue,
            unbonding_period ? number_1.validateIsNumber(unbonding_period) : true_1.validateTrue,
        ]);
        // const nativeTokenDenom = bAssetToNative.bluna[bAsset.toLowerCase()]
        var bAssetContractAddress = addressProvider.bAssetHub(bAsset);
        return [
            new terra_js_1.MsgExecuteContract(address, bAssetContractAddress, {
                update_params: {
                    epoch_period: epoch_period,
                    underlying_coin_denom: underlying_coin_denom,
                    unbonding_period: unbonding_period,
                    peg_recovery_fee: peg_recovery_fee,
                    er_threshold: er_threshold,
                    reward_denom: reward_denom,
                },
            }),
        ];
    };
};
exports.fabricatebAssetParams = fabricatebAssetParams;
//# sourceMappingURL=basset-update-params.js.map
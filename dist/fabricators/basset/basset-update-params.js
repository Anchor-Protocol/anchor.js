"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebAssetParams = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const true_1 = require("../../utils/validation/true");
const fabricatebAssetParams = ({ address, epoch_period, underlying_coin_denom, unbonding_period, peg_recovery_fee, er_threshold, reward_denom, bAsset, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        epoch_period ? number_1.validateIsNumber(epoch_period) : true_1.validateTrue,
        unbonding_period ? number_1.validateIsNumber(unbonding_period) : true_1.validateTrue,
    ]);
    // const nativeTokenDenom = bAssetToNative.bluna[bAsset.toLowerCase()]
    const bAssetContractAddress = addressProvider.bAssetHub(bAsset);
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
exports.fabricatebAssetParams = fabricatebAssetParams;

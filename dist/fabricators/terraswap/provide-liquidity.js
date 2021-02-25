"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateTerraSwapProvideLiquidity = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var number_1 = require("../../utils/validation/number");
var fabricateTerraSwapProvideLiquidity = function (_a) {
    var address = _a.address, slippageTolerance = _a.slippageTolerance, bAsset = _a.bAsset, tokenAmount = _a.tokenAmount, nativeAmount = _a.nativeAmount, quote = _a.quote;
    return function (addressProvider) {
        validate_input_1.validateInput([
            address_1.validateAddress(address),
            number_1.validateIsGreaterThanZero(tokenAmount),
            number_1.validateIsGreaterThanZero(nativeAmount),
        ]);
        var pairAddress = addressProvider.blunaUlunaPair();
        var tokenAddress = addressProvider.bAssetToken(bAsset);
        var coins = new terra_js_1.Coins([
            new terra_js_1.Coin(quote, new terra_js_1.Int(new terra_js_1.Dec(nativeAmount).mul(1000000)).toString()),
        ]);
        return [
            new terra_js_1.MsgExecuteContract(address, pairAddress, {
                provide_liquidity: {
                    assets: [
                        {
                            info: {
                                token: {
                                    contract_addr: tokenAddress,
                                },
                            },
                            amount: new terra_js_1.Int(new terra_js_1.Dec(tokenAmount).mul(1000000)).toString(),
                        },
                        {
                            info: {
                                native_token: {
                                    denom: quote,
                                },
                            },
                            amount: new terra_js_1.Int(new terra_js_1.Dec(nativeAmount).mul(1000000)).toString(),
                        },
                    ],
                    slippage_tolerance: slippageTolerance ? slippageTolerance : undefined,
                },
            }, coins),
        ];
    };
};
exports.fabricateTerraSwapProvideLiquidity = fabricateTerraSwapProvideLiquidity;
//# sourceMappingURL=provide-liquidity.js.map
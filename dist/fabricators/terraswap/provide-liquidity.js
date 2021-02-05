"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateTerraSwapProvideLiquidity = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const number_1 = require("../../utils/validation/number");
const fabricateTerraSwapProvideLiquidity = ({ address, slippageTolerance, bAsset, tokenAmount, nativeAmount, quote, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        number_1.validateIsGreaterThanZero(tokenAmount),
        number_1.validateIsGreaterThanZero(nativeAmount),
    ]);
    const pairAddress = addressProvider.blunaBurnPair();
    const tokenAddress = addressProvider.bAssetToken(bAsset);
    const coins = new terra_js_1.Coins([
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
                slippage_tolerance: slippageTolerance,
            },
        }, coins),
    ];
};
exports.fabricateTerraSwapProvideLiquidity = fabricateTerraSwapProvideLiquidity;

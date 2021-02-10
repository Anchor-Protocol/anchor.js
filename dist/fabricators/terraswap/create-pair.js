"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebTerraSwapCreatePair = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validate_input_1 = require("../../utils/validate-input");
var address_1 = require("../../utils/validation/address");
var fabricatebTerraSwapCreatePair = function (_a) {
    var address = _a.address, bAsset = _a.bAsset, nativeToken = _a.nativeToken;
    return function (addressProvider) {
        validate_input_1.validateInput([address_1.validateAddress(address)]);
        var bAssetTokenAddress = addressProvider.bAssetToken(bAsset);
        var terrawswapFactory = addressProvider.terraswapFactory();
        return [
            new terra_js_1.MsgExecuteContract(address, terrawswapFactory, {
                create_pair: {
                    asset_infos: [
                        {
                            token: {
                                contract_addr: bAssetTokenAddress,
                            },
                        },
                        {
                            native_token: {
                                denom: nativeToken,
                            },
                        },
                    ],
                },
            }),
        ];
    };
};
exports.fabricatebTerraSwapCreatePair = fabricatebTerraSwapCreatePair;
//# sourceMappingURL=create-pair.js.map
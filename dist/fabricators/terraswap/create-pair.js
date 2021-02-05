"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricatebTerraSwapCreatePair = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const fabricatebTerraSwapCreatePair = ({ address, bAsset, nativeToken, }) => (addressProvider) => {
    validate_input_1.validateInput([address_1.validateAddress(address)]);
    const bAssetTokenAddress = addressProvider.bAssetToken(bAsset);
    const terrawswapFactory = addressProvider.terraswapFactory();
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
exports.fabricatebTerraSwapCreatePair = fabricatebTerraSwapCreatePair;

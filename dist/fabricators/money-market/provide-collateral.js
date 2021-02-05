"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricateProvideCollateral = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const create_hook_msg_1 = require("../../utils/cw20/create-hook-msg");
const validate_input_1 = require("../../utils/validate-input");
const address_1 = require("../../utils/validation/address");
const basset_1 = require("../../utils/validation/basset");
const market_1 = require("../../utils/validation/market");
const number_1 = require("../../utils/validation/number");
/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to deposit collateral. Currently only supports UST and KRT.
 //  * @param borrower (optional) — Terra address of the entity that created the loan position. If null, adds collateral to address‘s loan position.
 * @param loan_id ID of address’s loan position to add collateral. For each addresses, their first loan position is given ID = 0, second loan ID = 1, third ID = 2, etc.. If this field is [(address’s current highest loan_id) + 1], a new loan position is created.
 * @param symbol Symbol of collateral to deposit.
 * @param amount Amount of collateral to deposit.
 */
const fabricateProvideCollateral = ({ address, market, symbol, amount, }) => (addressProvider) => {
    validate_input_1.validateInput([
        address_1.validateAddress(address),
        market_1.validateWhitelistedMarket(market),
        // borrower ? validateAddress(borrower) : validateTrue,
        basset_1.validateWhitelistedBAsset(symbol),
        number_1.validateIsGreaterThanZero(amount),
    ]);
    const bAssetTokenContract = addressProvider.bAssetToken(symbol.toLowerCase());
    const mmOverseerContract = addressProvider.overseer(market.toLowerCase());
    const custodyContract = addressProvider.custody(market.toLocaleLowerCase());
    // cw20 send + provide_collateral hook
    return [
        // provide_collateral call
        new terra_js_1.MsgExecuteContract(address, bAssetTokenContract, {
            send: {
                contract: custodyContract,
                amount: new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                msg: create_hook_msg_1.createHookMsg({
                    deposit_collateral: {},
                }),
            },
        }),
        // lock_collateral call
        new terra_js_1.MsgExecuteContract(address, mmOverseerContract, {
            // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/master/contracts/overseer/src/msg.rs#L75
            lock_collateral: {
                collaterals: [
                    [
                        bAssetTokenContract,
                        new terra_js_1.Int(new terra_js_1.Dec(amount).mul(1000000)).toString(),
                    ],
                ],
            },
        }),
    ];
};
exports.fabricateProvideCollateral = fabricateProvideCollateral;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhitelistedMarket = void 0;
// @ts-ignore
var market_json_1 = __importDefault(require("../../constants/market.json"));
var validateWhitelistedMarket = function (market) { return [
    function () { return !!market_json_1.default.ust && market === 'ust'; },
    "unknown market " + market + ".",
]; };
exports.validateWhitelistedMarket = validateWhitelistedMarket;
//# sourceMappingURL=market.js.map
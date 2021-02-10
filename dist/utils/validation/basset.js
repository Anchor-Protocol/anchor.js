"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhitelistedBAsset = void 0;
// @ts-ignore
var basset_json_1 = __importDefault(require("../../constants/basset.json"));
var validateWhitelistedBAsset = function (symbol) { return [
    function () { return basset_json_1.default.bluna && symbol.toLocaleLowerCase() === 'bluna'; },
    "unknown bAsset symbol " + symbol + ".",
]; };
exports.validateWhitelistedBAsset = validateWhitelistedBAsset;
//# sourceMappingURL=basset.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhitelistedBAsset = void 0;
// @ts-ignore
const basset_json_1 = __importDefault(require("../../constants/basset.json"));
const validateWhitelistedBAsset = (symbol) => [
    () => basset_json_1.default.bluna && symbol.toLocaleLowerCase() === 'bluna',
    `unknown bAsset symbol ${symbol}.`,
];
exports.validateWhitelistedBAsset = validateWhitelistedBAsset;

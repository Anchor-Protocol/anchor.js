"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhitelistedStable = void 0;
const validateWhitelistedStable = (symbol) => [
    () => symbol === 'usd',
    `symbol ${symbol} is not whitelisted.`,
];
exports.validateWhitelistedStable = validateWhitelistedStable;

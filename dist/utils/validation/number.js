"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIsStringPrecision = exports.validateIsGreaterThanZero = exports.validateIsNumber = void 0;
const terra_js_1 = require("@terra-money/terra.js");
const validateIsNumber = (n) => [
    () => !new terra_js_1.Dec(n).isNaN(),
    `invalid number ${n}`,
];
exports.validateIsNumber = validateIsNumber;
const validateIsGreaterThanZero = (n) => [
    () => new terra_js_1.Dec(n).greaterThan(0),
    `number should be > 0.`,
];
exports.validateIsGreaterThanZero = validateIsGreaterThanZero;
const validateIsStringPrecision = (n) => [
    () => !new terra_js_1.Int(n).isNaN() && n.toString().split('.').length === 2,
    `number should be in precision format: ${n}.`,
];
exports.validateIsStringPrecision = validateIsStringPrecision;

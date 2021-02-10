"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIsStringPrecision = exports.validateIsGreaterThanZero = exports.validateIsNumber = void 0;
var terra_js_1 = require("@terra-money/terra.js");
var validateIsNumber = function (n) { return [
    function () { return !new terra_js_1.Dec(n).isNaN(); },
    "invalid number " + n,
]; };
exports.validateIsNumber = validateIsNumber;
var validateIsGreaterThanZero = function (n) { return [
    function () { return new terra_js_1.Dec(n).greaterThan(0); },
    "number should be > 0.",
]; };
exports.validateIsGreaterThanZero = validateIsGreaterThanZero;
var validateIsStringPrecision = function (n) { return [
    function () { return !new terra_js_1.Int(n).isNaN() && n.toString().split('.').length === 2; },
    "number should be in precision format: " + n + ".",
]; };
exports.validateIsStringPrecision = validateIsStringPrecision;
//# sourceMappingURL=number.js.map
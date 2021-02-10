"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValAddress = exports.validateAddress = void 0;
var validateAddress = function (address) { return [
    function () { return true; },
    "invalid address " + address + ".",
]; };
exports.validateAddress = validateAddress;
var validateValAddress = function (valAddress) { return [
    function () { return true; },
    "invalid validator address " + valAddress + ".",
]; };
exports.validateValAddress = validateValAddress;
//# sourceMappingURL=address.js.map
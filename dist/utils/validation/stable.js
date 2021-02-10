"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhitelistedStable = void 0;
var validateWhitelistedStable = function (symbol) { return [
    function () { return symbol === 'usd'; },
    "symbol " + symbol + " is not whitelisted.",
]; };
exports.validateWhitelistedStable = validateWhitelistedStable;
//# sourceMappingURL=stable.js.map
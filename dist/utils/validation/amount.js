"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAmountSet = void 0;
var terra_js_1 = require("@terra-money/terra.js");
function isAmountSet(amount) {
    return !!amount && !new terra_js_1.Dec(amount).isNaN();
}
exports.isAmountSet = isAmountSet;
//# sourceMappingURL=amount.js.map
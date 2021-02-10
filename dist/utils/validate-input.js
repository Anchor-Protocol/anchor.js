"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
var validateInput = function (inputEntries) {
    return inputEntries.every(function (entry) {
        var predicate = typeof entry[0] === "function" ? entry[0]() : entry[0];
        if (!predicate)
            throw new Error(entry[1]);
        return true;
    });
};
exports.validateInput = validateInput;
//# sourceMappingURL=validate-input.js.map
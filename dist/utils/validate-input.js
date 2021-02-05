"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const validateInput = (inputEntries) => inputEntries.every((entry) => {
    const predicate = typeof entry[0] === 'function' ? entry[0]() : entry[0];
    if (!predicate)
        throw new Error(entry[1]);
    return true;
});
exports.validateInput = validateInput;

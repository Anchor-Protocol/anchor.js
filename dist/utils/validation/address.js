"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValAddress = exports.validateAddress = void 0;
const validateAddress = (address) => [
    () => true,
    `invalid address ${address}.`,
];
exports.validateAddress = validateAddress;
const validateValAddress = (valAddress) => [
    () => true,
    `invalid validator address ${valAddress}.`,
];
exports.validateValAddress = validateValAddress;

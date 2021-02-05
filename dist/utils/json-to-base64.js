"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToBase64 = void 0;
const jsonToBase64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');
exports.jsonToBase64 = jsonToBase64;

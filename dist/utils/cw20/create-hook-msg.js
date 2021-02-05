"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHookMsg = void 0;
const createHookMsg = (msg) => Buffer.from(JSON.stringify(msg)).toString('base64');
exports.createHookMsg = createHookMsg;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHookMsg = void 0;
var createHookMsg = function (msg) {
    return Buffer.from(JSON.stringify(msg)).toString('base64');
};
exports.createHookMsg = createHookMsg;
//# sourceMappingURL=create-hook-msg.js.map
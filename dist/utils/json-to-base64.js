"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToBase64 = void 0;
var jsonToBase64 = function (obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64");
};
exports.jsonToBase64 = jsonToBase64;
//# sourceMappingURL=json-to-base64.js.map
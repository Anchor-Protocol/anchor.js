"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactifyEnv = void 0;
const reactifyEnv = (key) => `REACT_APP_${key}`;
exports.reactifyEnv = reactifyEnv;

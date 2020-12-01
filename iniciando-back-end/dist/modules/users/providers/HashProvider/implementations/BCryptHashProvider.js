"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

class BCryptHaseProvider {
  async generateHash(payload) {
    return (0, _bcryptjs.hash)(payload, 8);
  }

  async compareHash(payload, hashed) {
    return (0, _bcryptjs.compare)(payload, hashed);
  }

}

var _default = BCryptHaseProvider;
exports.default = _default;
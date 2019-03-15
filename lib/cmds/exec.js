"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
function execute(argLine) {
    shelljs_1.default.exec("git " + argLine);
    shelljs_1.default.exec("git submodule foreach --recursive git " + argLine);
}
exports.execute = execute;
exports.default = execute;

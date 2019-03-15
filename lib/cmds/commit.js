"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
function commit(args) {
    console.log('called gst ', args);
    var cmd = 'commit';
    if (args.m) {
        cmd = "commit -m \"" + args.m + "\"";
    }
    "'npm install || :'";
    shelljs_1.default.exec("git submodule foreach --recursive 'git add . || :'");
    shelljs_1.default.exec("git submodule foreach --recursive 'git " + cmd + " || :'");
    shelljs_1.default.exec("git add .");
    shelljs_1.default.exec("git " + cmd);
}
exports.commit = commit;
exports.default = commit;

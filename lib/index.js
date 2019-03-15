"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var exec_1 = __importDefault(require("./cmds/exec"));
var branch_1 = __importDefault(require("./cmds/branch"));
var status_1 = __importDefault(require("./cmds/status"));
var commit_1 = __importDefault(require("./cmds/commit"));
var version_1 = __importDefault(require("./cmds/version"));
var help_1 = __importDefault(require("./cmds/help"));
function main() {
    var args = minimist_1.default(process.argv.slice(2));
    var argLine = process.argv.slice(2).join(" ");
    var cmd = args._[0] || 'help';
    if (args.version || args.v) {
        cmd = 'version';
    }
    if (args.help || args.h) {
        cmd = 'help';
    }
    switch (cmd) {
        case 'branch':
            if (args.d || args.D) {
                exec_1.default(argLine);
            }
            else {
                branch_1.default(args);
            }
            break;
        case 'status':
            status_1.default(args);
            break;
        case 'commit':
            commit_1.default(args);
            break;
        case 'checkout':
        case 'pull':
        case 'reset':
        case 'push':
        case 'fetch':
        case 'add':
            exec_1.default(argLine);
            break;
        case 'version':
            version_1.default(args);
            break;
        case 'help':
            help_1.default(args);
            break;
        default:
            console.error("Command '" + cmd + "' is not supported!");
            break;
    }
}
exports.main = main;
exports.default = main;

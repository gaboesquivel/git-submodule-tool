"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
var splitSpaces_1 = require("../utils/splitSpaces");
var parseSubmodules_1 = require("../utils/parseSubmodules");
var printer_1 = require("../utils/printer");
function parseBranches(output) {
    var branches = {
        lines: [],
        coloredLines: []
    };
    var rows = splitSpaces_1.splitSpaces(output);
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (row === "*") {
            branches.coloredLines.push(i);
        }
        else {
            branches.lines.push(row);
        }
    }
    return branches;
}
function parseChildModuleBranches(output) {
    var parsedOutput = parseSubmodules_1.parseSubmodules(output);
    var repoOutput = parsedOutput.map(function (repo) { return ({
        name: repo.repo,
        output: parseBranches(repo.output)
    }); });
    return repoOutput;
}
function branch(args) {
    var parentResult = shelljs_1.default.exec('git branch', { silent: true });
    var subModuleResult = shelljs_1.default.exec('git submodule foreach --recursive git branch', { silent: true });
    var parentBranches = parseBranches(parentResult.stdout);
    var parsedChildren = parseChildModuleBranches(subModuleResult.stdout);
    printer_1.printParent(parentBranches);
    printer_1.printSubmodules(parsedChildren);
}
exports.branch = branch;
exports.default = branch;

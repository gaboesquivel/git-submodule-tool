"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
// import splitSpaces from "./utils/splitSpaces"; 
var parseSubmodules_1 = require("../utils/parseSubmodules");
function parseStatuses(rows) {
    var statuses = {
        lines: [],
        coloredLines: []
    };
    // TODO: split on:
    // 'Changes not staged for commit:'
    // 'Changes to be committed:'
    // 'Untracked files:'
    // --> Remove lines that are surrounded in parentheses
    // file keys:
    // 'modified:'
    // 'new file:'
    // 'deleted:'
    // 'nothing to commit, working tree clean'
    for (var i = 0; i < rows.length; i++) {
    }
    return statuses;
}
function parseChildModuleStatuses(output) {
    var parsedOutput = parseSubmodules_1.parseSubmodules(output);
    var repoOutput = parsedOutput.map(function (repo) { return ({
        name: repo.repo,
        output: parseStatuses(repo.output)
    }); });
    return repoOutput;
}
function status(args) {
    var parentResult = shelljs_1.default.exec('git status', { silent: true });
    var subModuleResult = shelljs_1.default.exec('git submodule foreach --recursive git status', { silent: true });
    var subs = parseChildModuleStatuses(subModuleResult);
    console.log('subs: ', subs);
    // console.log(parentResult.stdout);
    // console.log(subModuleResult.stdout);
    // const parentBranches = parseBranches(splitSpaces(parentResult.stdout));
    // const parsedChildren = parseChildModuleBranches(subModuleResult.stdout);
    // printParent(parentBranches);
    // printSubmodules(parsedChildren);
}
exports.status = status;
exports.default = status;

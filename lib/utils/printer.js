"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
function printLines(text, tab) {
    for (var i = 0; i < text.lines.length; i++) {
        var row = text.lines[i];
        var print = function () { };
        if (text.coloredLines.indexOf(i) > -1) {
            print = function (s) { return console.log(chalk_1.default.green(s)); };
        }
        else {
            print = function (s) { return console.log(chalk_1.default.blue(s)); };
        }
        print("" + tab + row);
    }
}
exports.printLines = printLines;
function printParent(lines) {
    console.log('Parent');
    printLines(lines, "  ");
    console.log("");
}
exports.printParent = printParent;
function printSubmodules(submodules) {
    console.log('Submodules');
    submodules.forEach(function (repo) {
        console.log("  " + repo.name);
        printLines(repo.output, "    ");
        console.log("");
    });
}
exports.printSubmodules = printSubmodules;

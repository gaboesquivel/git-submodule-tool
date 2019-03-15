"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitSpaces(text) {
    return text.trim().split(/\\n*\s+|\s+/);
}
exports.splitSpaces = splitSpaces;

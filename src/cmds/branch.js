const shell = require("shelljs");

const splitSpaces = require("../utils/splitSpaces");
const parseSubmodules = require("../utils/parseSubmodules");
const printer = require("../utils/printer");

function parseBranches(output) {
    const branches = {
        lines: [],
        greenLines: [],
        blueLines: [],
        redLines: []
    }

    const rows = splitSpaces(output);
    let lineSelected = false;
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row === "*") {
            lineSelected = true;
        } else {
            branches.lines.push(row);
            if (lineSelected) {
                branches.greenLines.push(branches.lines.length - 1);
                lineSelected = false;
            } else {
                branches.blueLines.push(branches.lines.length - 1);
            }
        }
    }

    return branches;
}

function parseChildModuleBranches(output) {
    const parsedOutput = parseSubmodules(output);
    const repoOutput = parsedOutput.map(repo => ({
        name: repo.repo,
        output: parseBranches(repo.output)
    }));
    return repoOutput;
}

module.exports = (args) => {
    
    const parentResult = shell.exec('git branch', { silent: true });
    const subModuleResult = shell.exec('git submodule foreach --recursive git branch', { silent: true });

    const parentBranches = parseBranches(parentResult.stdout);
    const parsedChildren = parseChildModuleBranches(subModuleResult.stdout);

    printer.printParent(parentBranches);
    printer.printSubmodules(parsedChildren);
}


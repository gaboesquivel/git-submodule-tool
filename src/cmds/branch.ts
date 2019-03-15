import shell from "shelljs";

import { splitSpaces } from "../utils/splitSpaces";
import { parseSubmodules } from "../utils/parseSubmodules";
import { printParent, printSubmodules } from "../utils/printer";

function parseBranches(output) {
    const branches = {
        lines: [],
        coloredLines: []
    }

    const rows = splitSpaces(output);
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row === "*") {
            branches.coloredLines.push(i);
        } else {
            branches.lines.push(row);
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

export function branch(args) {
    
    const parentResult = shell.exec('git branch', { silent: true });
    const subModuleResult = shell.exec('git submodule foreach --recursive git branch', { silent: true });

    const parentBranches = parseBranches(parentResult.stdout);
    const parsedChildren = parseChildModuleBranches(subModuleResult.stdout);

    printParent(parentBranches);
    printSubmodules(parsedChildren);
}

export default branch;


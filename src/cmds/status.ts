import shell from "shelljs";

// import splitSpaces from "./utils/splitSpaces"; 
import { parseSubmodules } from "../utils/parseSubmodules";

function parseStatuses(rows) {
    const statuses = {
        lines: [],
        coloredLines: []
    }

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
    for (let i = 0; i < rows.length; i++) {

    }

    return statuses;
}

function parseChildModuleStatuses(output) {
    const parsedOutput = parseSubmodules(output);
    const repoOutput = parsedOutput.map(repo => ({
        name: repo.repo,
        output: parseStatuses(repo.output)
    }));
    return repoOutput;
}

export function status(args) {
    
    const parentResult = shell.exec('git status', { silent: true });
    const subModuleResult = shell.exec('git submodule foreach --recursive git status', { silent: true });

    const subs = parseChildModuleStatuses(subModuleResult);
    console.log('subs: ', subs);

    // console.log(parentResult.stdout);
    // console.log(subModuleResult.stdout);

    // const parentBranches = parseBranches(splitSpaces(parentResult.stdout));
    // const parsedChildren = parseChildModuleBranches(subModuleResult.stdout);

    // printParent(parentBranches);
    // printSubmodules(parsedChildren);
}

export default status;


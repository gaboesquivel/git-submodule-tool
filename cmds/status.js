const shell = require("shelljs");
const chalk = require("chalk");
const log = console.log;

function splitSpaces(text) {
    return text.trim().split(/\\n*\s+|\s+/);
}

function parseStatuses(rows) {
    const branches = {
        lst: [],
        selectedIndex: -1
    }

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row === "*") {
            branches.selectedIndex = i;
        } else {
            branches.lst.push(row);
        }
    }

    return branches;
}

function parseChildModuleStatuses(output) {
    const repoStatuses = output.trim().split(/Entering/);
    const repoOutput = [];
    for (let i = 0; i < repoStatuses.length; i++) {
        const repo = repoStatuses[i];
        if (repo !== '') {
            const repoRows = splitSpaces(repo);
            repoOutput.push({
                repoName: repoRows[0].replace(/'/g, ""),
                status: parseBranches(repoRows.slice(1))
            });
        }
    }
    return repoOutput;
}

function printStatuses(statuses, tab) {
    const print = (s) => log(chalk.blue(s));
    for (let i = 0; i < statuses.lst.length; i++) {
        const row = statuses.lst[i];
        print(`${tab}${row}`);
    }
}

function printParent(statuses) {
    console.log('Parent');
    printStatuses(statuses, "  ");
    console.log("");
}

function printSubmodules(statuses) {
    console.log('Submodules');
    repos.forEach(repo => {
        console.log(`  ${repo.repoName}`);
        printStatuses(repo.status, "    ");
        console.log("");
    });
}

module.exports = (args) => {
    
    const parentResult = shell.exec('git status', { silent: true });
    const subModuleResult = shell.exec('git submodule foreach --recursive git status', { silent: true });

    console.log(parentResult.stdout);
    console.log(subModuleResult.stdout);

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



    

    // const parentBranches = parseBranches(splitSpaces(parentResult.stdout));
    // const parsedChildren = parseChildModuleBranches(subModuleResult.stdout);

    // printParent(parentBranches);
    // printSubmodules(parsedChildren);
}


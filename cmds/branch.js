const shell = require("shelljs");
const chalk = require("chalk");
const log = console.log;

function splitSpaces(text) {
    return text.trim().split(/\\n*\s+|\s+/);
}

function parseBranches(rows) {
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

function parseChildModuleBranches(output) {
    const repoBranches = output.trim().split(/Entering/);
    const repoOutput = [];
    for (let i = 0; i < repoBranches.length; i++) {
        const repo = repoBranches[i];
        if (repo !== '') {
            const repoRows = splitSpaces(repo);
            repoOutput.push({
                repoName: repoRows[0].replace(/'/g, ""),
                branches: parseBranches(repoRows.slice(1))
            });
        }
    }
    return repoOutput;
}

function printBranches(branches, tab) {
    for (let i = 0; i < branches.lst.length; i++) {
        const row = branches.lst[i];
        let print = () => {};
        if (i === branches.selectedIndex) {
            print = (s) => log(chalk.green(s));
        } else {
            print = (s) => log(chalk.blue(s));
        }
        print(`${tab}${row}`);
    }
}

function printParent(branches) {
    console.log('Parent');
    printBranches(branches, "  ");
    console.log("");
}

function printSubmodules(repos) {
    console.log('Submodules');
    repos.forEach(repo => {
        console.log(`  ${repo.repoName}`);
        printBranches(repo.branches, "    ");
        console.log("");
    });
}

module.exports = (args) => {
    
    const parentResult = shell.exec('git branch', { silent: true });
    const subModuleResult = shell.exec('git submodule foreach --recursive git branch', { silent: true });

    const parentBranches = parseBranches(splitSpaces(parentResult.stdout));
    const parsedChildren = parseChildModuleBranches(subModuleResult.stdout);

    printParent(parentBranches);
    printSubmodules(parsedChildren);
}


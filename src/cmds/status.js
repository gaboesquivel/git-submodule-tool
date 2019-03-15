const shell = require("shelljs");

const splitSpaces = require("../utils/splitSpaces");
const splitLines = require("../utils/splitLines");
const parseSubmodules = require("../utils/parseSubmodules");
const printer = require("../utils/printer");

const NOCOMMIT = "nothing to commit";
const NOT_STAGED = "Changes not staged for commit";
const STAGED = "Changes to be committed";
const UNTRACKED = "Untracked files";

const GIT_ADD = '"git add';
const GIT_COMMIT = '"git commit';

function isParenthesesLine(line) {
    return line.trim().startsWith("(") && line.trim().endsWith(")");
}

function isSuggestion(line) {
    return isParenthesesLine(line) || line.indexOf(GIT_ADD) > -1 || line.indexOf(GIT_COMMIT) > -1;
}

function parseStatus(output) {
    const statuses = {
        lines: [],
        greenLines: [],
        blueLines: [],
        redLines: []
    }

    const splitRows = splitLines(output);
    let section = null;
    splitRows.forEach(r => {
        if (r.indexOf(NOCOMMIT) > -1) {
            statuses.lines.push(NOCOMMIT);
            statuses.blueLines.push(statuses.lines.length - 1);
        } else if (r.indexOf(NOT_STAGED) > -1) {
            section = NOT_STAGED;
            statuses.lines.push(`${NOT_STAGED}:`);
        } else if (r.indexOf(STAGED) > -1) {
            section = STAGED;
            statuses.lines.push(`${STAGED}:`);
        } else if (r.indexOf(UNTRACKED) > -1) {
            section = UNTRACKED;
            statuses.lines.push(`${UNTRACKED}:`);
        } else {
            if (section && !isSuggestion(r)) {
                statuses.lines.push(`  ${r.trim()}`);
                if (section === NOT_STAGED || section === UNTRACKED) {
                    statuses.redLines.push(statuses.lines.length - 1);
                } else {
                    statuses.greenLines.push(statuses.lines.length - 1);
                }
            }
        }
    });


    return statuses;
}

function parseChildModuleStatuses(output) {
    const parsedOutput = parseSubmodules(output);
    const repoOutput = parsedOutput.map(repo => {
        return {
            name: repo.repo,
            output: parseStatus(repo.output)
        };
    });
    return repoOutput;
}

module.exports = (args) => {
    
    const parentResult = shell.exec('git status', { silent: true });
    const subModuleResult = shell.exec('git submodule foreach --recursive git status', { silent: true });

    const parent = parseStatus(parentResult.stdout);
    const subs = parseChildModuleStatuses(subModuleResult.stdout);

    printer.printParent(parent);
    printer.printSubmodules(subs);
}


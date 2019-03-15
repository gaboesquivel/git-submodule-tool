const chalk = require('chalk');

function printLines(text, tab) {
    for (let i = 0; i < text.lines.length; i++) {
        const row = text.lines[i];
        let print = () => {};
        if (text.coloredLines.indexOf(i) > -1) {
            print = (s) => console.log(chalk.green(s));
        } else {
            print = (s) => console.log(chalk.blue(s));
        }
        print(`${tab}${row}`);
    }
}

module.exports = {
    printParent: (lines) => {
        console.log('Parent');
        printLines(lines, "  ");
        console.log("");
    },
    printSubmodules: (submodules) => {
        console.log('Submodules');
        submodules.forEach(repo => {
            console.log(`  ${repo.name}`);
            printLines(repo.output, "    ");
            console.log("");
        });
    }
}
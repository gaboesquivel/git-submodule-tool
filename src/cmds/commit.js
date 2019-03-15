const shell = require("shelljs");
const chalk = require("chalk");

module.exports = (args) => {
    let cmd = 'commit';

    if (args.m) {
        cmd = `commit -m "${args.m}"`;

        shell.exec(`git submodule foreach --recursive 'git add . || :'`);
        shell.exec(`git submodule foreach --recursive 'git ${cmd} || :'`);
        shell.exec(`git add .`)
        shell.exec(`git ${cmd}`);
    } else {
        console.error(chalk.red(`ERROR: Console editors not supported. Must use 'gst commit -m "{message}"`));
    }

}
